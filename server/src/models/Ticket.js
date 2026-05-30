const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Ticket = sequelize.define("Ticket", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },

  github: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  avatar: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Users",
      key: "id",
    },
    onDelete: "CASCADE",
  },
});

module.exports = Ticket;
