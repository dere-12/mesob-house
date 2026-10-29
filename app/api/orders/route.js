import { z } from "zod";
import { createOrder } from "@/lib/db";
import { orderSchema } from "@/lib/schema";
import { getSession } from "@/lib/session";

export async function POST(request) {
  const user = await getSession();

  if (!user) {
    return Response.json({ error: "Not signed in" }, { status: 401 });
  }

  let body;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON request" }, { status: 400 });
  }

  const result = orderSchema.safeParse(body);

  if (!result.success) {
    return Response.json(
      {
        error: "Validation failed",
        fieldErrors: z.flattenError(result.error).fieldErrors,
      },
      { status: 422 },
    );
  }

  try {
    const order = await createOrder(result.data, user.id);

    return Response.json(order, { status: 201 });
  } catch (error) {
    console.error("Failed to create order:", error);

    return Response.json(
      { error: "Could not create the order." },
      { status: 500 },
    );
  }
}
