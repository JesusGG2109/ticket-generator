const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "Ruta de eventos funcionando"
  });
});

module.exports = router;