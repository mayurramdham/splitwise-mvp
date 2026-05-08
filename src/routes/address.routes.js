import { Router } from "express";
import addressController from "../controllers/address.controller";
import validate from "../middlewares/validate.js";
import { addAddressSchema } from "../validator/address.validator.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const addressRoutes = Router();
addressRoutes.post("/", authMiddleware, validate(addAddressSchema), addressController.add);

export { addressRoutes };
