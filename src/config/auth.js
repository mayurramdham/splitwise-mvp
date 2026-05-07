export default {
  secret: process.env.JWT_SECRET || "splitwise-secret",
  expiresIn: "7d",
};
