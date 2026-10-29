import z from "zod";
import { createOrder } from "@/lib/db";
import { orderSchema } from "@/lib/schema";

export async function POST(request) {
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

  const order = await createOrder(result.data);

  return Response.json(order, { status: 201 });
}
