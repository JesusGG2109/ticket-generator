const request = require("supertest");
const createApp = require("../src/app");
const { sequelize, User } = require("../src/models");

describe("Auth API", () => {
  let app;

  beforeAll(async () => {
    await sequelize.sync({ force: true });
    app = createApp();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  beforeEach(async () => {
    await User.destroy({ where: {}, truncate: true });
  });

  describe("POST /api/auth/register", () => {
    it("crea un usuario y devuelve user + token", async () => {
      const res = await request(app)
        .post("/api/auth/register")
        .send({
          name: "Jesus",
          email: "jesus@test.com",
          password: "secret123",
        });

      expect(res.status).toBe(201);
      expect(res.body.user).toMatchObject({
        name: "Jesus",
        email: "jesus@test.com",
        role: "user",
      });
      expect(res.body.user.passwordHash).toBeUndefined();
      expect(typeof res.body.token).toBe("string");
      expect(res.body.token.split(".")).toHaveLength(3);
    });

    it("rechaza email duplicado con 409", async () => {
      await request(app).post("/api/auth/register").send({
        name: "Jesus",
        email: "dup@test.com",
        password: "secret123",
      });

      const res = await request(app).post("/api/auth/register").send({
        name: "Otro",
        email: "dup@test.com",
        password: "secret123",
      });

      expect(res.status).toBe(409);
      expect(res.body.message).toMatch(/correo ya esta registrado/i);
    });

    it("rechaza datos invalidos con 400 y lista de errors", async () => {
      const res = await request(app)
        .post("/api/auth/register")
        .send({ name: "J", email: "no-email", password: "12" });

      expect(res.status).toBe(400);
      expect(res.body.message).toMatch(/datos invalidos/i);
      expect(Array.isArray(res.body.errors)).toBe(true);
      expect(res.body.errors.length).toBeGreaterThanOrEqual(3);
    });

    it("guarda la contrasena hasheada (no en claro)", async () => {
      await request(app).post("/api/auth/register").send({
        name: "Jesus",
        email: "hash@test.com",
        password: "secret123",
      });

      const user = await User.findOne({ where: { email: "hash@test.com" } });
      expect(user.passwordHash).not.toBe("secret123");
      expect(user.passwordHash).toMatch(/^\$2[aby]\$/);
    });
  });

  describe("POST /api/auth/login", () => {
    beforeEach(async () => {
      await request(app).post("/api/auth/register").send({
        name: "Jesus",
        email: "login@test.com",
        password: "secret123",
      });
    });

    it("autentica con credenciales correctas", async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: "login@test.com",
        password: "secret123",
      });

      expect(res.status).toBe(200);
      expect(res.body.user.email).toBe("login@test.com");
      expect(res.body.token).toBeDefined();
    });

    it("rechaza password incorrecto con 401", async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: "login@test.com",
        password: "wrong-password",
      });

      expect(res.status).toBe(401);
      expect(res.body.message).toMatch(/credenciales invalidas/i);
    });

    it("rechaza email inexistente con 401 (mismo mensaje generico)", async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: "noexiste@test.com",
        password: "secret123",
      });

      expect(res.status).toBe(401);
      expect(res.body.message).toMatch(/credenciales invalidas/i);
    });

    it("rechaza body invalido con 400", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({ email: "no-email" });

      expect(res.status).toBe(400);
    });
  });

  describe("GET /api/auth/me", () => {
    let token;

    beforeEach(async () => {
      const res = await request(app).post("/api/auth/register").send({
        name: "Jesus",
        email: "me@test.com",
        password: "secret123",
      });
      token = res.body.token;
    });

    it("devuelve el usuario con token valido", async () => {
      const res = await request(app)
        .get("/api/auth/me")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.email).toBe("me@test.com");
      expect(res.body.passwordHash).toBeUndefined();
    });

    it("responde 401 sin token", async () => {
      const res = await request(app).get("/api/auth/me");
      expect(res.status).toBe(401);
      expect(res.body.message).toMatch(/token no proporcionado/i);
    });

    it("responde 401 con formato invalido", async () => {
      const res = await request(app)
        .get("/api/auth/me")
        .set("Authorization", token);
      expect(res.status).toBe(401);
      expect(res.body.message).toMatch(/formato de token invalido/i);
    });

    it("responde 401 con token corrupto", async () => {
      const res = await request(app)
        .get("/api/auth/me")
        .set("Authorization", "Bearer not-a-real-token");
      expect(res.status).toBe(401);
      expect(res.body.message).toMatch(/token invalido/i);
    });
  });
});
