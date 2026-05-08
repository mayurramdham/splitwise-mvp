import Sequelize from "sequelize";
import BaseModel from "./BaseModel.js";

class Address extends BaseModel {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        city: Sequelize.STRING,
        state: Sequelize.STRING,
        neighborhood: Sequelize.STRING,
        country: Sequelize.STRING,
        ...this.baseAttributes(),
      },
      this.baseOptions(sequelize)
    );

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.User, {
      through: "UserAddress",
      foreignKey: "addressId",
    });
  }
}

export default Address;
