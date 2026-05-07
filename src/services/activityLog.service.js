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
            new Date(now.getFullYear(), now.getMonth(), 0),
          ],
        };
      }
    }

    return await ActivityLog.findAll({
      where,
      order: [["createdAt", "DESC"]],
    });
  }
}

export default ActivityLogService;
