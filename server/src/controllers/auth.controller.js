const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../models");
const { registerSchema, loginSchema } = require("../validators/authValidator");

const sanitizeUser = (user) => {
  const { id, name, email, role, createdAt, updatedAt } = user;
  return { id, name, email, role, createdAt, updatedAt };
};

const signToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    }
  );
};

const register = async (req, res) => {
  try {
    const validatedData = registerSchema.parse(req.body);

    const existing = await User.findOne({
      where: { email: validatedData.email },
    });

    if (existing) {
      return res.status(409).json({
        message: "El correo ya esta registrado",
      });
    }

    const passwordHash = await bcrypt.hash(validatedData.password, 10);

    const user = await User.create({
      name: validatedData.name,
      email: validatedData.email,
      passwordHash,
    });

    const token = signToken(user);

    return res.status(201).json({
      user: sanitizeUser(user),
      token,
    });
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({
        message: "Datos invalidos",
        errors: error.issues,
      });
    }

    return res.status(500).json({
      message: "Error creando usuario",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const validatedData = loginSchema.parse(req.body);

    const user = await User.findOne({
      where: { email: validatedData.email },
    });

    if (!user) {
      return res.status(401).json({
        message: "Credenciales invalidas",
      });
    }

    const passwordOk = await bcrypt.compare(
      validatedData.password,
      user.passwordHash
    );

    if (!passwordOk) {
      return res.status(401).json({
        message: "Credenciales invalidas",
      });
    }

    const token = signToken(user);

    return res.json({
      user: sanitizeUser(user),
      token,
    });
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({
        message: "Datos invalidos",
        errors: error.issues,
      });
    }

    return res.status(500).json({
      message: "Error iniciando sesion",
      error: error.message,
    });
  }
};

const me = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    return res.json(sanitizeUser(user));
  } catch (error) {
    return res.status(500).json({
      message: "Error obteniendo usuario",
      error: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  me,
};
