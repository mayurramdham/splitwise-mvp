import Sequelize, { Model } from "sequelize";

class BaseModel extends Model {
  static baseAttributes() {
    return {
      createdBy: {
        type: Sequelize.UUID,
        allowNull: true,
      },

      updatedBy: {
        type: Sequelize.UUID,
        allowNull: true,
      },

      deletedBy: {
        type: Sequelize.UUID,
        allowNull: true,
      },
    };
  }

  static baseOptions(sequelize, extraOptions = {}) {
    return {
      sequelize,
      timestamps: true,
      paranoid: true,
      underscored: true,
      ...extraOptions,
    };
  }
}

export default BaseModel;
