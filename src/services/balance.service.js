import { ExpenseParticipant } from "../models/index.js";

class BalanceService {
  static async getUserBalances(userId) {
    const records = await ExpenseParticipant.findAll({
      where: { user_id: userId },
      include: ["expense"],
    });

    let balance = 0;

    records.forEach((r) => {
      balance += Number(r.amount_paid) - Number(r.amount_owed);
    });

    return {
      user_id: userId,
      balance,
    };
  }

  static async getFriendBalances(userId) {
    const records = await ExpenseParticipant.findAll({
      where: { user_id: userId },
      include: ["expense"],
    });

    const balances = {};

    for (const r of records) {
      const diff = Number(r.amount_paid) - Number(r.amount_owed);

      const expenseParticipants = await ExpenseParticipant.findAll({
        where: { expense_id: r.expense_id },
      });

      expenseParticipants.forEach((p) => {
        if (p.user_id === userId) return;

        if (!balances[p.user_id]) balances[p.user_id] = 0;

        balances[p.user_id] -= diff;
      });
    }

    return balances;
  }

  static async getBalanceBetweenUsers(userA, userB) {
    const expensesA = await ExpenseParticipant.findAll({
      where: { user_id: userA },
    });

    const expensesB = await ExpenseParticipant.findAll({
      where: { user_id: userB },
    });

    let balance = 0;

    expensesA.forEach((e) => {
      balance += Number(e.amount_paid) - Number(e.amount_owed);
    });

    expensesB.forEach((e) => {
      balance -= Number(e.amount_paid) - Number(e.amount_owed);
    });

    return balance;
  }
}

export default BalanceService;
