const sequelize = require("../config/database");

const Event = require("./Event");
const User = require("./User");

module.exports = {
  sequelize,
  Event,
  User,
};
