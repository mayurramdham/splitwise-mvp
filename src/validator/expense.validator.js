import { z } from "zod";

export const createExpenseSchema = z.object({
    body: z.object({
        name: z.string().min(1, "Expense name is required"),
        value: z.number().positive("Value must be greater than 0"),
        currency: z.string().min(1, "Currency is required"),
        split_type: z.string().optional(),

        participants: z
            .array(
                z.object({
                    user_id: z.string().uuid("Invalid user_id"),
                    amount_paid: z.number().optional(),
                })
            )
            .min(1, "At least one participant is required"),
    }),
});

export const updateExpenseSchema = z.object({
    params: z.object({
        id: z.string().uuid("Invalid expense id"),
    }),
    body: z.object({
        name: z.string().optional(),
        value: z.number().positive().optional(),
        currency: z.string().optional(),
    }),
});

export const settlementSchema = z.object({
    body: z.object({
        expense_id: z.string().uuid("Invalid expense id"),
        from_user: z.string().uuid("Invalid user id"),
        amount: z.number().positive("Amount must be greater than 0"),
    }),
});