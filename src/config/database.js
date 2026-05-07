require('dotenv/config');

const config = {
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  define: {
    timestamps: true
  },
};

if (process.env.DB_DIALECT === 'sqlite') {
  config.storage = process.env.DB_NAME;
  delete config.host;
  delete config.username;
  delete config.password;
}

module.exports = config;

