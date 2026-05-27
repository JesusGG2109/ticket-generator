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

const isProd = process.env.NODE_ENV === "production";

sequelize
  .authenticate()
  .then(() => {
    console.log("Base de datos conectada");
  })
  .catch((error) => {
    console.error("Error de conexion a la base de datos:", error.message);
  });

if (!isProd) {
  sequelize
    .sync()
    .then(() => {
      console.log("Tablas sincronizadas");
    })
    .catch((error) => {
      console.error("Error sincronizando tablas:", error.message);
    });
} else {
  console.log(
    "Modo produccion: omitiendo sequelize.sync(). Usar migraciones para cambios de esquema."
  );
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
