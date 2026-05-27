const validateNumericId = (req, res, next) => {
  const { id } = req.params;

  if (!/^\d+$/.test(id)) {
    return res.status(400).json({
      message: "El id debe ser un numero entero positivo",
    });
  }

  next();
};

module.exports = validateNumericId;
