require("dotenv").config();

const { sequelize } = require("./models");
const express = require("express");
const cors = require("cors");

const eventRoutes = require("./routes/event.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Backend EventHub TECNM funcionando"
  });
});

app.use("/api/events", eventRoutes);

sequelize.authenticate()
  .then(() => {
    console.log("Base de datos conectada");
  })
  .catch((error) => {
    console.log("Error de conexion:", error);
  });

sequelize.sync()
  .then(() => {
    console.log("Tablas sincronizadas");
  });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
