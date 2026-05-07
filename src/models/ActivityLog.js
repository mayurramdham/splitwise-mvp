import Sequelize from "sequelize";
import BaseModel from "./BaseModel";

class ActivityLog extends BaseModel {
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

        entity_type: {
          type: Sequelize.STRING,
          allowNull: false,
        },

        entity_id: {
          type: Sequelize.UUID,
        },

        action: {
          type: Sequelize.STRING,
          allowNull: false,
        },

        metadata: {
          type: Sequelize.JSON,
        },

        ...this.baseAttributes(),
      },
      this.baseOptions(sequelize, {
        indexes: [
          { fields: ["user_id"] },
          { fields: ["entity_type"] },
          { fields: ["entity_id"] },
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
  }
}

export default ActivityLog;
