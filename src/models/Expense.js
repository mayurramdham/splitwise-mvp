import Sequelize from "sequelize";
import BaseModel from "./BaseModel";

class Expense extends BaseModel {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },

        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },

        value: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false,
          validate: {
            min: 0,
          },
        },

        currency: {
          type: Sequelize.STRING,
          allowNull: false,
        },

        split_type: {
          type: Sequelize.ENUM("equal", "exact", "percentage"),
          defaultValue: "equal",
        },

        date: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },

        created_by: {
          type: Sequelize.UUID,
          allowNull: false,
        },

        ...this.baseAttributes(),
      },
      this.baseOptions(sequelize, {
        indexes: [{ fields: ["created_by"] }, { fields: ["date"] }],
        paranoid: true,
      }),
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: "created_by",
      as: "creator",
    });

    this.hasMany(models.ExpenseParticipant, {
      foreignKey: "expense_id",
      as: "participants",
    });
  }
}

export default Expense;
