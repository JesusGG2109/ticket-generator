const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");

const swaggerSpec = require("./config/swagger");
const eventRoutes = require("./routes/event.routes");
const authRoutes = require("./routes/auth.routes");

const createApp = () => {
  const app = express();

  const corsOrigin = process.env.CORS_ORIGIN || "*";
  const corsConfig =
    corsOrigin === "*"
      ? {}
      : { origin: corsOrigin.split(",").map((s) => s.trim()) };

  app.use(cors(corsConfig));
  app.use(express.json());

  app.get("/", (req, res) => {
    res.json({
      status: "ok",
      message: "Backend EventHub TECNM funcionando",
    });
  });

  app.get("/api/health", (req, res) => {
    res.json({
      status: "ok",
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || "development",
      timestamp: new Date().toISOString(),
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

  return app;
};

module.exports = createApp;
