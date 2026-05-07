import { z } from "zod";

export const getActivitiesSchema = z.object({
  query: z.object({
    period: z.enum(["current_month", "last_month"]).optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
  }),
});
