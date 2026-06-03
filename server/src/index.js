require("dotenv").config();

const { sequelize } = require("./models");
const createApp = require("./app");

process.on("unhandledRejection", (reason) => {
  console.error("[unhandledRejection]", reason);
});

process.on("uncaughtException", (error) => {
  console.error("[uncaughtException]", error);
});

const app = createApp();

sequelize
  .authenticate()
  .then(async () => {
    console.log("Base de datos conectada");

    await sequelize.sync({ alter: true });

    console.log("Tablas sincronizadas");
  })
  .catch((error) => {
    console.error(
      "Error de conexion o sincronizacion:",
      error.message
    );
  });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});