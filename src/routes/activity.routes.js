import { Router } from "express";
import ActivityController from "../controllers/activity.controller";
import authMiddleware from "../middlewares/auth.middleware";
import validate from "../middlewares/validate.js";
import { getActivitiesSchema } from "../validator/activity.validator.js";
const activityRoutes = Router();
activityRoutes.get("/", authMiddleware, validate(getActivitiesSchema), ActivityController.getActivities);
export { activityRoutes };
