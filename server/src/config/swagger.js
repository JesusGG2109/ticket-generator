const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");

const routesGlob = path
  .join(__dirname, "..", "routes", "*.js")
  .replace(/\\/g, "/");

const definition = {
  openapi: "3.0.3",
  info: {
    title: "EventHub TECNM API",
    version: "1.0.0",
    description:
      "API REST del proyecto Conference Ticket Generator. Gestiona eventos y autenticacion de usuarios con JWT.",
    contact: {
      name: "EventHub TECNM",
    },
    license: {
      name: "Uso academico",
    },
  },
  servers: [
    {
      url: "http://localhost:3000/api",
      description: "Servidor de desarrollo",
    },
  ],
  tags: [
    {
      name: "Auth",
      description: "Registro, inicio de sesion y datos del usuario actual",
    },
    {
      name: "Events",
      description: "CRUD de eventos academicos",
    },
    {
      name: "Tickets",
      description: "Tickets de asistencia generados por el usuario",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description:
          "Token JWT emitido por POST /auth/login o POST /auth/register",
      },
    },
    schemas: {
      User: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          name: { type: "string", example: "Jesus Garcia" },
          email: {
            type: "string",
            format: "email",
            example: "jesus@tecnm.mx",
          },
          role: { type: "string", example: "user" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      RegisterRequest: {
        type: "object",
        required: ["name", "email", "password"],
        properties: {
          name: { type: "string", minLength: 2, example: "Jesus Garcia" },
          email: {
            type: "string",
            format: "email",
            example: "jesus@tecnm.mx",
          },
          password: { type: "string", minLength: 6, example: "secret123" },
        },
      },
      LoginRequest: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: {
            type: "string",
            format: "email",
            example: "jesus@tecnm.mx",
          },
          password: { type: "string", example: "secret123" },
        },
      },
      AuthResponse: {
        type: "object",
        properties: {
          user: { $ref: "#/components/schemas/User" },
          token: {
            type: "string",
            example:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.payload.signature",
          },
        },
      },
      Event: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          title: { type: "string", example: "Conferencia de IA" },
          description: {
            type: "string",
            example: "Charla magistral sobre IA aplicada",
          },
          location: {
            type: "string",
            example: "Auditorio TECNM Celaya",
          },
          date: {
            type: "string",
            format: "date-time",
            example: "2026-09-15T18:00:00.000Z",
          },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      EventInput: {
        type: "object",
        required: ["title", "description", "location", "date"],
        properties: {
          title: {
            type: "string",
            minLength: 3,
            example: "Conferencia de IA",
          },
          description: {
            type: "string",
            minLength: 5,
            example: "Charla magistral sobre IA aplicada",
          },
          location: {
            type: "string",
            minLength: 2,
            example: "Auditorio TECNM Celaya",
          },
          date: {
            type: "string",
            format: "date-time",
            example: "2026-09-15T18:00:00.000Z",
          },
        },
      },
      Ticket: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          name: { type: "string", example: "Jesus Garcia" },
          email: {
            type: "string",
            format: "email",
            example: "jesus@tecnm.mx",
          },
          github: { type: "string", nullable: true, example: "@jesusgg" },
          avatar: {
            type: "string",
            nullable: true,
            description: "Data URL o URL publica del avatar",
            example: "data:image/png;base64,iVBORw0K...",
          },
          userId: { type: "integer", example: 1 },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      TicketInput: {
        type: "object",
        required: ["name", "email"],
        properties: {
          name: {
            type: "string",
            minLength: 2,
            example: "Jesus Garcia",
          },
          email: {
            type: "string",
            format: "email",
            example: "jesus@tecnm.mx",
          },
          github: {
            type: "string",
            nullable: true,
            example: "@jesusgg",
          },
          avatar: {
            type: "string",
            nullable: true,
            description: "Data URL del avatar (opcional)",
          },
        },
      },
      Error: {
        type: "object",
        properties: {
          message: { type: "string", example: "Mensaje de error" },
        },
      },
      ValidationError: {
        type: "object",
        properties: {
          message: { type: "string", example: "Datos invalidos" },
          errors: {
            type: "array",
            items: {
              type: "object",
              properties: {
                path: {
                  type: "array",
                  items: { type: "string" },
                  example: ["password"],
                },
                message: {
                  type: "string",
                  example: "La contrasena debe tener minimo 6 caracteres",
                },
              },
            },
          },
        },
      },
    },
    responses: {
      BadRequest: {
        description: "Datos invalidos",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/ValidationError" },
          },
        },
      },
      Unauthorized: {
        description: "Token ausente, invalido o expirado",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Error" },
          },
        },
      },
      NotFound: {
        description: "Recurso no encontrado",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Error" },
          },
        },
      },
      Conflict: {
        description: "Conflicto (por ejemplo email duplicado)",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Error" },
          },
        },
      },
      ServerError: {
        description: "Error interno del servidor",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Error" },
          },
        },
      },
    },
  },
};

const options = {
  definition,
  apis: [routesGlob],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
