require("dotenv").config();

const { sequelize } = require("./models");
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const eventRoutes = require("./routes/event.routes");
const authRoutes = require("./routes/auth.routes");

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
app.use("/api/auth", authRoutes);

app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customSiteTitle: "EventHub TECNM API",
  })
);

app.get("/api/docs.json", (req, res) => {
  res.json(swaggerSpec);
});

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
