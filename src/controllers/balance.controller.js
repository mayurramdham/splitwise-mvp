import BalanceService from "../services/balance.service.js";
import EmailService from "../services/email.service.js";
import UserService from "../services/user.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { SUCCESS_MESSAGES } from "../utils/ApiMessages.js";

class BalanceController {
  getBalances = asyncHandler(async (req, res) => {
    const balances = await BalanceService.getUserBalances(req.userId);
    return ApiResponse.success(res, balances, SUCCESS_MESSAGES.BALANCES_FETCHED);
  });

  getFriendBalances = asyncHandler(async (req, res) => {
    const balances = await BalanceService.getFriendBalances(req.userId);
    return ApiResponse.success(res, balances, SUCCESS_MESSAGES.FRIEND_BALANCES_FETCHED);
  });

  getBalanceBetweenUsers = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const balance = await BalanceService.getBalanceBetweenUsers(req.userId, userId);
    return ApiResponse.success(res, { balance }, SUCCESS_MESSAGES.BALANCE_FETCHED);
  });

  sendMonthlyReport = asyncHandler(async (req, res) => {
    const user = await UserService.getProfile(req.userId);
    const balances = await BalanceService.getFriendBalances(req.userId);
    const result = await EmailService.sendMonthlyReport(user, balances);
    return ApiResponse.success(res, result, SUCCESS_MESSAGES.REPORT_SENT);
  });
}

export default new BalanceController();
