import jwt from "jsonwebtoken";
import authConfig from "../config/auth.js";
import { User } from "../models/index.js";
import { Errors } from "../utils/ApiError.js";

class UserService {
  static async register(data) {
    const { name, email, password, default_currency } = data;
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      throw Errors.badRequest("User already exists");
    }
    const user = await User.create({
      name,
      email,
      password,
      default_currency,
    });
    return { user };
  }

  static async login(email, password) {
    const user = await User.scope(null).findOne({ where: { email } });
    if (!user) {
      throw Errors.notFound("User not found");
    }
    if (!(await user.checkPassword(password))) {
      throw Errors.unauthorized("Invalid password");
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.SERVER_JWT_SECRET,
      {
        expiresIn: authConfig.expiresIn,
      }
    );
    return { user, token };
  }

  static async getProfile(userId) {
    const user = await User.findByPk(userId);
    if (!user) {
      throw Errors.notFound("User not found");
    }
    return user;
  }

  static async updateProfile(userId, data) {
    const { name, email, default_currency } = data;
    const user = await User.findByPk(userId);
    if (!user) {
      throw Errors.notFound("User not found");
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (default_currency) user.default_currency = default_currency;

    await user.save();
    return user;
  }

  static async deleteAccount(userId) {
    const user = await User.findByPk(userId);
    if (!user) {
      throw Errors.notFound("User not found");
    }
    await user.destroy(); // Soft delete because paranoid: true
    return true;
  }
}

export default UserService;