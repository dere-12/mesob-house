"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { orderSchema } from "@/lib/schema";
import { createOrder, getOrder, markCancelled } from "@/lib/db";
import { getDishes } from "@/lib/menu";

import { authenticateUser } from "@/lib/auth";
import { createSession, getSession, clearSession } from "@/lib/session";

import { safeNextPath } from "@/lib/redirects";

export async function signIn(_previousState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const next = safeNextPath(formData.get("next"));

  const user = await authenticateUser(email, password);

  if (!user) {
    return {
      success: false,
      message: "Email or password is incorrect.",
    };
  }

  await createSession(user);

  redirect(next);
}

export async function signOut() {
  await clearSession();

  redirect("/");
}

export async function placeOrder(_previousState, formData) {
  const user = await getSession();

  if (!user) {
    return {
      success: false,
      message: "Please sign in before placing an order.",
      fieldErrors: {},
    };
  }

  const orderData = {
    name: formData.get("name") ?? undefined,
    phone: formData.get("phone") ?? undefined,
    neighbourhood: formData.get("neighbourhood") ?? undefined,
  };

  const result = orderSchema.safeParse(orderData);

  if (!result.success) {
    return {
      success: false,
      message: "Please correct the highlighted fields.",
      fieldErrors: z.flattenError(result.error).fieldErrors,
    };
  }

  let submittedItems;

  try {
    submittedItems = JSON.parse(formData.get("cartItems") || "[]");
  } catch {
    return {
      success: false,
      message: "The cart data is invalid. Please return to your cart.",
      fieldErrors: {},
    };
  }

  if (!Array.isArray(submittedItems) || submittedItems.length === 0) {
    return {
      success: false,
      message: "Your cart is empty. Please add a dish before ordering.",
      fieldErrors: {},
    };
  }

  const dishes = await getDishes();
  const validatedItems = [];

  for (const submittedItem of submittedItems) {
    if (
      !submittedItem ||
      typeof submittedItem.slug !== "string" ||
      !Number.isInteger(submittedItem.quantity) ||
      submittedItem.quantity < 1
    ) {
      return {
        success: false,
        message: "One or more cart items are invalid. Please review your cart.",
        fieldErrors: {},
      };
    }

    const dish = dishes.find((item) => item.slug === submittedItem.slug);

    if (!dish) {
      return {
        success: false,
        message:
          "A dish in your cart is no longer available. Please review your cart.",
        fieldErrors: {},
      };
    }

    validatedItems.push({
      slug: dish.slug,
      nameEn: dish.nameEn,
      priceETB: dish.priceETB,
      quantity: submittedItem.quantity,
    });
  }

  const totalQuantity = validatedItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const order = await createOrder(
    {
      ...result.data,
      items: validatedItems,
      quantity: totalQuantity,
    },
    user.id,
  );

  revalidatePath("/orders");

  return {
    success: true,
    message: `Order created successfully: ${order.id}`,
    orderId: order.id,
    fieldErrors: {},
  };
}

export async function cancelOrder(orderId) {
  const user = await getSession();

  if (!user) {
    throw new Error("Not signed in");
  }

  const order = await getOrder(orderId);

  if (!order) {
    throw new Error("Order not found");
  }

  if (order.userId !== user.id) {
    throw new Error("Not yours");
  }

  const cancelledOrder = await markCancelled(orderId);

  revalidatePath("/orders");
  revalidatePath(`/orders/${orderId}`);

  return cancelledOrder;
}
