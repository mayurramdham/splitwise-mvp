import Sequelize from "sequelize";
import BaseModel from "./BaseModel.js";

class UserAddress extends BaseModel {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        userId: Sequelize.UUID,
        addressId: Sequelize.INTEGER,
        ...this.baseAttributes(),
      },
      this.baseOptions(sequelize, {
        tableName: "UserAddress",
      })
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "userId" });
    this.belongsTo(models.Address, { foreignKey: "addressId" });
  }
}

export default UserAddress;
