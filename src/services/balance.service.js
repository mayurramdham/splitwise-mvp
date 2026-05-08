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
    const userRecords = await ExpenseParticipant.findAll({
      where: { user_id: userId },
      attributes: ["expense_id"],
    });

    const expenseIds = userRecords.map((r) => r.expense_id);
    if (expenseIds.length === 0) return {};

    const allRecords = await ExpenseParticipant.findAll({
      where: { expense_id: expenseIds },
    });


    const expenses = {};
    for (const r of allRecords) {
      if (!expenses[r.expense_id]) expenses[r.expense_id] = [];
      expenses[r.expense_id].push(r);
    }

    const balances = {};

    for (const expenseId in expenses) {
      const participants = expenses[expenseId];

      const me = participants.find((p) => p.user_id === userId);
      if (!me) continue;

      const myNet = Number(me.amount_paid) - Number(me.amount_owed);
      if (myNet === 0) continue;

      let totalOverpaid = 0;
      for (const p of participants) {
        const net = Number(p.amount_paid) - Number(p.amount_owed);
        if (net > 0) totalOverpaid += net;
      }

      for (const p of participants) {
        if (p.user_id === userId) continue;

        const theirNet = Number(p.amount_paid) - Number(p.amount_owed);
        if (!balances[p.user_id]) balances[p.user_id] = 0;

        if (myNet > 0 && theirNet < 0) {
          const ratio = myNet / totalOverpaid;
          const theyOweMe = Math.abs(theirNet) * ratio;
          balances[p.user_id] += theyOweMe;
        } else if (myNet < 0 && theirNet > 0) {
          const ratio = theirNet / totalOverpaid;
          const iOweThem = Math.abs(myNet) * ratio;
          balances[p.user_id] -= iOweThem;
        }
      }
    }

    for (const friend in balances) {
      balances[friend] = Math.round(balances[friend] * 100) / 100;
      if (balances[friend] === 0) delete balances[friend];
    }

    return balances;
  }

  static async getBalanceBetweenUsers(userA, userB) {

    const recordsA = await ExpenseParticipant.findAll({
      where: { user_id: userA },
      attributes: ["expense_id"],
    });
    const recordsB = await ExpenseParticipant.findAll({
      where: { user_id: userB },
      attributes: ["expense_id"],
    });

    const expenseIdsA = new Set(recordsA.map((r) => r.expense_id));
    const sharedExpenseIds = recordsB
      .map((r) => r.expense_id)
      .filter((id) => expenseIdsA.has(id));

    if (sharedExpenseIds.length === 0) return 0;

    const allRecords = await ExpenseParticipant.findAll({
      where: { expense_id: sharedExpenseIds },
    });

    const expenses = {};
    for (const r of allRecords) {
      if (!expenses[r.expense_id]) expenses[r.expense_id] = [];
      expenses[r.expense_id].push(r);
    }

    let finalBalance = 0;

    for (const expenseId in expenses) {
      const participants = expenses[expenseId];

      const pA = participants.find((p) => p.user_id === userA);
      const pB = participants.find((p) => p.user_id === userB);

      const netA = Number(pA.amount_paid) - Number(pA.amount_owed);
      const netB = Number(pB.amount_paid) - Number(pB.amount_owed);

      if ((netA > 0 && netB > 0) || (netA < 0 && netB < 0) || netA === 0 || netB === 0) {
        continue;
      }

      let totalOverpaid = 0;
      for (const p of participants) {
        const net = Number(p.amount_paid) - Number(p.amount_owed);
        if (net > 0) totalOverpaid += net;
      }

      if (netA > 0 && netB < 0) {
        const ratio = netA / totalOverpaid;
        finalBalance += Math.abs(netB) * ratio;
      } else if (netA < 0 && netB > 0) {
        const ratio = netB / totalOverpaid;
        finalBalance -= Math.abs(netA) * ratio;
      }
    }

    return Math.round(finalBalance * 100) / 100;
  }
}

export default BalanceService;
