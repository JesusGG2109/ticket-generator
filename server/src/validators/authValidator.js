const { z } = require("zod");

const registerSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener minimo 2 caracteres"),

  email: z
    .string()
    .email("Correo invalido"),

  password: z
    .string()
    .min(6, "La contrasena debe tener minimo 6 caracteres"),
});

const loginSchema = z.object({
  email: z
    .string()
    .email("Correo invalido"),

  password: z
    .string()
    .min(1, "La contrasena es requerida"),
});

module.exports = {
  registerSchema,
  loginSchema,
};
