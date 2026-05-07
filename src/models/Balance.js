import Sequelize from "sequelize";
import BaseModel from "./BaseModel";

class Balance extends BaseModel {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },

        user_id: {
          type: Sequelize.UUID,
          allowNull: false,
        },

        owes_to_user_id: {
          type: Sequelize.UUID,
          allowNull: false,
        },

        amount: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false,
          defaultValue: 0,
          validate: {
            min: 0,
          },
        },

        currency: {
          type: Sequelize.STRING,
          allowNull: false,
        },

        ...this.baseAttributes(),
      },
      this.baseOptions(sequelize, {
        indexes: [
          { fields: ["user_id"] },
          { fields: ["owes_to_user_id"] },
          {
            unique: true,
            fields: ["user_id", "owes_to_user_id"],
          },
        ],
      }),
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });

    this.belongsTo(models.User, {
      foreignKey: "owes_to_user_id",
      as: "owedTo",
    });
  }
}

export default Balance;
