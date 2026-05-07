import { Sequelize } from "sequelize";
import databaseConfig from "../config/database";
import fs from "fs";

const modelFiles = fs
  .readdirSync(__dirname + "/../models/")
  .filter(
    (file) =>
      file.endsWith(".js") && file !== "BaseModel.js" && file !== "index.js",
  );

let sequelize; // global instance

const sequelizeService = {
  init: async () => {
    try {
      sequelize = new Sequelize(databaseConfig);

      for (const file of modelFiles) {
        const model = await import(`../models/${file}`);
        model.default.init(sequelize);
      }

      for (const file of modelFiles) {
        const model = await import(`../models/${file}`);
        if (model.default.associate) {
          model.default.associate(sequelize.models);
        }
      }

      await sequelize.sync();

      console.log("[SEQUELIZE] Database service initialized");
    } catch (error) {
      console.log("[SEQUELIZE] Error during database service initialization");
      throw error;
    }
  },

  getSequelize: () => sequelize,

  getModels: () => sequelize.models,
};

export default sequelizeService;
