import { z } from "zod";

export const orderSchema = z.object({
  name: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Name is required"
          : "Name must be a string",
    })
    .min(2, { error: "Name must be at least 2 characters" }),

  phone: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Phone number is required"
          : "Phone must be a string",
    })
    .regex(/^(09|\+2519)\d{8}$/, {
      error: "Phone number must start with 09… or +2519… followed by 8 digits",
    }),

  neighbourhood: z
    .string()
    .min(1, { error: "Please select a delivery neighbourhood" }),

  dishId: z.string().optional(),

  quantity: z
    .number()
    .min(1, { error: "Quantity must be at least 1" })
    .optional()
    .default(1),

  notes: z
    .string()
    .max(200, { error: "Notes cannot exceed 200 characters" })
    .optional(),
});
