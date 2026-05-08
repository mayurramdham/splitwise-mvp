import Sequelize from "sequelize";
import bcrypt from "bcryptjs";
import BaseModel from "./BaseModel";

class User extends BaseModel {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        default_currency: {
          type: Sequelize.STRING,
          defaultValue: "INR",
        },
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        ...this.baseAttributes(),
      },
      this.baseOptions(sequelize, {
        defaultScope: {
          attributes: { exclude: ["password_hash"] },
        },
        underscored: false,
        paranoid: true,
      })
    );

    this.addHook("beforeSave", async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Address, {
      through: "UserAddress",
      foreignKey: "userId",
    });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
