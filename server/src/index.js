require("dotenv").config();

const { sequelize } = require("./models");
const createApp = require("./app");

const app = createApp();

sequelize
  .authenticate()
  .then(() => {
    console.log("Base de datos conectada");
  })
  .catch((error) => {
    console.log("Error de conexion:", error);
  });

sequelize.sync().then(() => {
  console.log("Tablas sincronizadas");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
