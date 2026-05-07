import { Expense, ExpenseParticipant } from "../models/index.js";
import ActivityLogService from "./activityLog.service.js";
import sequelizeService from "./sequelize.service.js";
import { Errors } from "../utils/ApiError.js";

class ExpenseService {
  static async createExpense(userId, data) {
    const sequelize = sequelizeService.getSequelize();
    const transaction = await sequelize.transaction();
    try {
      const { name, value, currency, split_type, participants } = data;
      const expense = await Expense.create({ name, value, currency, split_type, created_by: userId, },
        { transaction },
      );
      const splitAmount = value / participants.length;
      const participantData = participants.map((p) => ({
        expense_id: expense.id,
        user_id: p.user_id,
        amount_paid: p.amount_paid || 0,
        amount_owed: splitAmount,
      }));
      await ExpenseParticipant.bulkCreate(participantData, { transaction });
      await transaction.commit();
      await ActivityLogService.logActivity({
        user_id: userId,
        entity_type: "expense",
        entity_id: expense.id,
        action: "expense_created",
        metadata: {
          value: expense.value,
          currency: expense.currency,
          name: expense.name,
        },
      });
      return expense;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }



  static async getUserExpenses(userId) {
    return await Expense.findAll({
      include: [
        {
          model: ExpenseParticipant,
          as: "participants",
          where: { user_id: userId },
        },
      ],
      order: [["date", "DESC"]],
    });
  }

  static async ExpenseSettleExpense(userId, data) {
    const { expense_id, from_user, amount } = data;
    const record = await ExpenseParticipant.findOne({
      where: {
        expense_id,
        user_id: from_user,
      },
    });

    if (!record) throw Errors.notFound("Participant not found");

    record.amount_owed -= amount;
    await record.save();

    await ActivityLogService.logActivity({
      user_id: userId,
      entity_type: "settlement",
      entity_id: record.id,
      action: "settlement_created",
      metadata: {
        amount: data.amount,
      },
    });

    return record;
  }

  static async updateExpense(expenseId, data, userId) {
    const expense = await Expense.findByPk(expenseId);
    if (!expense) throw Errors.notFound("Expense not found");
    if (expense.created_by !== userId) throw Errors.forbidden("Unauthorized");
    await expense.update(data);
    await ActivityLogService.logActivity({
      user_id: userId,
      entity_type: "expense",
      entity_id: expense.id,
      action: "expense_updated",
      metadata: data,
    });

    return expense;
  }


  static async deleteExpense(expenseId, userId) {
    const expense = await Expense.findByPk(expenseId);
    if (!expense) throw Errors.notFound("Expense not found");
    if (expense.created_by !== userId) throw Errors.forbidden("Unauthorized");
    const sequelize = sequelizeService.getSequelize();
    const transaction = await sequelize.transaction();
    try {
      await ExpenseParticipant.destroy({
        where: { expense_id: expenseId },
        transaction,
      });
      await expense.destroy({ transaction });
      await transaction.commit();

      await ActivityLogService.logActivity({
        user_id: userId,
        entity_type: "expense",
        entity_id: expenseId,
        action: "expense_deleted",
      });
      return true;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}

export default ExpenseService;
