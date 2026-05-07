import UserService from "../services/user.service.js";
import JwtService from "../services/jwt.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { SUCCESS_MESSAGES } from "../utils/ApiMessages.js";

class LoginController {
  login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const result = await UserService.login(email, password);
    return ApiResponse.success(res, result, SUCCESS_MESSAGES.USER_LOGGED_IN);
  });

  logout = asyncHandler(async (req, res) => {
    const token = JwtService.jwtGetToken(req);
    JwtService.jwtBlacklistToken(token);
    return ApiResponse.success(res, {}, SUCCESS_MESSAGES.LOGOUT_SUCCESS);
  });
}

export default new LoginController();
