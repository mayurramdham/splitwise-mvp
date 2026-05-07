import UserService from "../services/user.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { SUCCESS_MESSAGES } from "../utils/ApiMessages.js";


class UserController {

  register = asyncHandler(async (req, res) => {
    const user = await UserService.register(req.body);
    return ApiResponse.success(res, user, SUCCESS_MESSAGES.USER_REGISTERED);
  });


  login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const result = await UserService.login(email, password);
    return ApiResponse.success(res, result, SUCCESS_MESSAGES.USER_LOGGED_IN);
  });

  getProfile = asyncHandler(async (req, res) => {
    const user = await UserService.getProfile(req.userId);
    return ApiResponse.success(res, user, SUCCESS_MESSAGES.USER_FETCHED);
  });

  updateProfile = asyncHandler(async (req, res) => {
    const user = await UserService.updateProfile(req.userId, req.body);
    return ApiResponse.success(res, user, SUCCESS_MESSAGES.PROFILE_UPDATED);
  });

  deleteAccount = asyncHandler(async (req, res) => {
    await UserService.deleteAccount(req.userId);
    return ApiResponse.success(res, {}, SUCCESS_MESSAGES.ACCOUNT_DELETED);
  });

  logout = asyncHandler(async (req, res) => {
    // Logic for blacklisting token if needed, or just return success
    return ApiResponse.success(res, {}, SUCCESS_MESSAGES.LOGOUT_SUCCESS);
  });
}

export default new UserController();