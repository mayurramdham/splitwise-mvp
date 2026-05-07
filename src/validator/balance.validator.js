import { z } from "zod";

export const getBalanceBetweenUsersSchema = z.object({
  params: z.object({
    userId: z.string().uuid("Invalid user id"),
  }),
});

export const settlementSchema = z.object({
  body: z.object({
    expense_id: z.string().uuid("Invalid expense id"),
    from_user: z.string().uuid("Invalid user id"),
    amount: z.number().positive("Amount must be greater than 0"),
  }),
});
