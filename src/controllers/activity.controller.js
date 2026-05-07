import ActivityLogService from "../services/activityLog.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { SUCCESS_MESSAGES } from "../utils/ApiMessages.js";

class ActivityController {
  getActivities = asyncHandler(async (req, res) => {
    const { period, startDate, endDate } = req.query;
    const activities = await ActivityLogService.getUserActivities(req.userId, {
      period,
      startDate,
      endDate,
    });
    return ApiResponse.success(res, activities, SUCCESS_MESSAGES.ACTIVITIES_FETCHED);
  });
}

export default new ActivityController();
