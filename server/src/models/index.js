const sequelize = require("../config/database");

const Event = require("./Event");
const User = require("./User");

User.hasMany(Event, {
  foreignKey: "userId",
  as: "events",
  onDelete: "SET NULL",
});

Event.belongsTo(User, {
  foreignKey: "userId",
  as: "owner",
});

module.exports = {
  sequelize,
  Event,
  User,
};
