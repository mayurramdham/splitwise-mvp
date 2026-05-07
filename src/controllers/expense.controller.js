import ExpenseService from "../services/expense.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { SUCCESS_MESSAGES } from "../utils/ApiMessages.js";

class ExpenseController {
  createExpense = asyncHandler(async (req, res) => {
    const expense = await ExpenseService.createExpense(req.userId, req.body);
    return ApiResponse.success(res, expense, SUCCESS_MESSAGES.EXPENSE_CREATED);
  });

  getExpenses = asyncHandler(async (req, res) => {
    const expenses = await ExpenseService.getUserExpenses(req.userId);
    return ApiResponse.success(res, expenses, SUCCESS_MESSAGES.EXPENSES_FETCHED);
  });

  ExpenseSettle = asyncHandler(async (req, res) => {
    const result = await ExpenseService.ExpenseSettleExpense(req.userId, req.body);
    return ApiResponse.success(res, result, SUCCESS_MESSAGES.SETTLEMENT_SUCCESS);
  });

  updateExpense = asyncHandler(async (req, res) => {
    const expense = await ExpenseService.updateExpense(req.params.id, req.body, req.userId);
    return ApiResponse.success(res, expense, SUCCESS_MESSAGES.EXPENSE_UPDATED);
  });

  deleteExpense = asyncHandler(async (req, res) => {
    await ExpenseService.deleteExpense(req.params.id, req.userId);
    return ApiResponse.success(res, {}, SUCCESS_MESSAGES.EXPENSE_DELETED);
  });
}

export default new ExpenseController();
