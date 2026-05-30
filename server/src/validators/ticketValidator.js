const { z } = require("zod");

const createTicketSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener minimo 2 caracteres"),

  email: z
    .string()
    .email("Correo invalido"),

  github: z
    .string()
    .optional()
    .nullable(),

  avatar: z
    .string()
    .optional()
    .nullable(),
});

module.exports = {
  createTicketSchema,
};
