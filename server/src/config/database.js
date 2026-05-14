const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "eventhub_tecnm",
  "postgres",
  "123456",
  {
    host: "localhost",
    dialect: "postgres",
    port: 5432
  }
);

module.exports = sequelize;