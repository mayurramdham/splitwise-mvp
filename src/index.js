import dotenv from "dotenv";
import express from "express";
import { initJobs } from "./jobs/index.js";
import sequelizeService from "./services/sequelize.service.js";
import awsService from "./services/aws.service.js";
import { userRoutes } from "./routes/user.routes.js";
import expenseRoutes from "./routes/expense.routes.js";
import balanceRoutes from "./routes/balance.routes.js";
import { activityRoutes } from "./routes/activity.routes.js";
import { addressRoutes } from "./routes/address.routes.js";
import errorHandler from "./middlewares/errorHandler.js";
import requestLogger from "./middlewares/requestLogger.js";

dotenv.config();

const app = express();
app.use(requestLogger);
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/balances", balanceRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/address", addressRoutes);
app.use(errorHandler);
const services = [sequelizeService, awsService];
(async () => {
  try {
    for (const service of services) {
      await service.init();
    }
    app.listen(3000, () => {
      console.log("Server initialized on port 3000");
      initJobs();
    });

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();