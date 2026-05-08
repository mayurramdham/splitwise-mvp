import cron from "node-cron";
import { User } from "../models/index.js";
import BalanceService from "../services/balance.service.js";
import EmailService from "../services/email.service.js";

const BATCH_SIZE = 100;

export const initMonthlyReportJob = () => {
  // Schedule monthly report email (Runs at 00:00 on the 1st of every month)

  cron.schedule("0 0 1 * *", async () => {
    console.log("CRON Starting monthly report generation");
    try {
      let offset = 0;
      let hasMore = true;

      while (hasMore) {

        const users = await User.findAll({
          limit: BATCH_SIZE,
          offset: offset,
          order: [["id", "ASC"]],
        });

        if (users.length === 0) {
          hasMore = false;
          break;
        }

        for (const user of users) {
          try {
            const balances = await BalanceService.getFriendBalances(user.id);
            await EmailService.sendMonthlyReport(user, balances);
          } catch (userError) {

            console.error(`[CRON] Failed to send report to user ${user.id}:`, userError);
          }
        }

        offset += BATCH_SIZE;
      }

      console.log("[CRON] Monthly reports sent successfully.");
    } catch (error) {
      console.error("[CRON] Critical error during monthly report generation:", error);
    }
  });

  console.log("[CRON] Monthly report job initialized.");
};
