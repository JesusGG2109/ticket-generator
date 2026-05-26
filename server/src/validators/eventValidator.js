const { z } = require("zod");

const eventSchema = z.object({
  title: z
    .string()
    .min(3, "El titulo debe tener minimo 3 caracteres"),

  description: z
    .string()
    .min(5, "La descripcion es muy corta"),

  location: z
    .string()
    .min(2, "La ubicacion es requerida"),

  date: z
    .string()
});

module.exports = {
  eventSchema
};