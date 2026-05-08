import { Router } from "express";
import ExpenseController from "../controllers/expense.controller";
import authMiddleware from "../middlewares/auth.middleware";
import BalanceController from "../controllers/balance.controller";

import { getBalanceBetweenUsersSchema } from "../validator/balance.validator.js";
import validate from "../middlewares/validate.js";

const router = Router();
router.get("/", authMiddleware, BalanceController.getBalances);
router.get("/friends", authMiddleware, BalanceController.getFriendBalances);
router.get("/:userId", authMiddleware, validate(getBalanceBetweenUsersSchema), BalanceController.getBalanceBetweenUsers);
router.post("/report", authMiddleware, BalanceController.sendMonthlyReport);
export default router;
