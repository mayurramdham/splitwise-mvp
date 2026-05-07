import { Router } from "express";
import userController from "../controllers/user.controller";
import authMiddleware from "../middlewares/auth.middleware";
import validate from "../middlewares/validate.js";
import { registerSchema, loginSchema, updateProfileSchema } from "../validator/user.validator.js";

const userRoutes = Router();
userRoutes.post("/register", validate(registerSchema), userController.register);
userRoutes.post("/login", validate(loginSchema), userController.login);
userRoutes.get("/me", authMiddleware, userController.getProfile);
userRoutes.put("/me", authMiddleware, validate(updateProfileSchema), userController.updateProfile);
userRoutes.delete("/me", authMiddleware, userController.deleteAccount);
userRoutes.get("/logout", authMiddleware, userController.logout);

export { userRoutes };
