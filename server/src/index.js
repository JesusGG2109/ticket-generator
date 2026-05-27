require("dotenv").config();

const { sequelize } = require("./models");
const createApp = require("./app");

const app = createApp();

const isProd = process.env.NODE_ENV === "production";

sequelize
  .authenticate()
  .then(() => {
    console.log("Base de datos conectada");
  })
  .catch((error) => {
    console.log("Error de conexion:", error);
  });

if (!isProd) {
  sequelize.sync().then(() => {
    console.log("Tablas sincronizadas");
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
