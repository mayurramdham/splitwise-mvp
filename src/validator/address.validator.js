import { z } from "zod";

export const addAddressSchema = z.object({
  body: z.object({
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    country: z.string().min(1, "Country is required"),
    neighborhood: z.string().optional(),
  }),
});
