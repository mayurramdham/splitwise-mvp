import Sequelize from "sequelize";
import BaseModel from "./BaseModel";

class ExpenseParticipant extends BaseModel {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },

        expense_id: {
          type: Sequelize.UUID,
          allowNull: false,
        },

        user_id: {
          type: Sequelize.UUID,
          allowNull: false,
        },

        amount_paid: {
          type: Sequelize.DECIMAL(10, 2),
          defaultValue: 0,
          validate: {
            min: 0,
          },
        },

        amount_owed: {
          type: Sequelize.DECIMAL(10, 2),
          defaultValue: 0,
          validate: {
            min: 0,
          },
        },

        ...this.baseAttributes(),
      },
      this.baseOptions(sequelize, {
        indexes: [
          { fields: ["expense_id"] },
          { fields: ["user_id"] },
          {
            unique: true,
            fields: ["expense_id", "user_id"],
          },
        ],
        paranoid: true,
      }),
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Expense, {
      foreignKey: "expense_id",
      as: "expense",
    });

    this.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });
  }
}

export default ExpenseParticipant;
