const sequelize = require("../config/database");

const Event = require("./Event");
const User = require("./User");
const Ticket = require("./Ticket");

User.hasMany(Event, {
  foreignKey: "userId",
  as: "events",
  onDelete: "SET NULL",
});

Event.belongsTo(User, {
  foreignKey: "userId",
  as: "owner",
});

User.hasMany(Ticket, {
  foreignKey: "userId",
  as: "tickets",
  onDelete: "CASCADE",
});

Ticket.belongsTo(User, {
  foreignKey: "userId",
  as: "owner",
});

module.exports = {
  sequelize,
  Event,
  User,
  Ticket,
};
