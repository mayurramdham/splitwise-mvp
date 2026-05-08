import { ActivityLog } from "../models/index.js";
import { Op } from "sequelize";

class ActivityLogService {
  static async logActivity({
    user_id,
    entity_type,
    entity_id,
    action,
    metadata = {},
  }) {
    return await ActivityLog.create({
      user_id,
      entity_type,
      entity_id,
      action,
      metadata,
    });
  }

  static async getUserActivities(userId, filters = {}) {
    const where = { user_id: userId };

    if (filters.startDate && filters.endDate) {
      where.created_at = {
        [Op.between]: [new Date(filters.startDate), new Date(filters.endDate)],
      };
      return await ActivityLog.findAll({ where, order: [["createdAt", "DESC"]] });
    } else if (filters.period) {
      const now = new Date();
      if (filters.period === "current_month") {
        where.created_at = {
          [Op.gte]: new Date(now.getFullYear(), now.getMonth(), 1),
        };
      } else if (filters.period === "last_month") {
        where.created_at = {
          [Op.between]: [
            new Date(now.getFullYear(), now.getMonth() - 1, 1),
            new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999),
          ],
        };
      }
      return await ActivityLog.findAll({ where, order: [["createdAt", "DESC"]] });
    }

    const allActivities = await ActivityLog.findAll({
      where,
      order: [["createdAt", "DESC"]],
    });

    const grouped = {
      current_month: [],
      last_month: [],
      older: [],
    };

    const now = new Date();
    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);

    for (const activity of allActivities) {
      const dateStr = activity.createdAt || activity.created_at;
      if (!dateStr) continue;
      const d = new Date(dateStr);
      if (d >= currentMonthStart) {
        grouped.current_month.push(activity);
      } else if (d >= lastMonthStart && d <= lastMonthEnd) {
        grouped.last_month.push(activity);
      } else {
        grouped.older.push(activity);
      }
    }

    return grouped;
  }
}

export default ActivityLogService;
