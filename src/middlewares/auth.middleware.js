import JwtService from "../services/jwt.service";
import { BadTokenError } from "../utils/ApiError";

const authMiddleware = async (req, res, next) => {
  try {
    if (process.env.SERVER_JWT === "false") return next();
    const token = JwtService.jwtGetToken(req);
    console.log("Auth Middleware: Received token:", token);
    console.log("Extracted token:", token);
    const decoded = JwtService.jwtVerify(token);

    req.userId = decoded.id;
    console.log("Decoded token:", decoded);
    console.log("UserId:", req.userId);

    return next();
  } catch (error) {
    next(new BadTokenError());
  }
};

export default authMiddleware;
