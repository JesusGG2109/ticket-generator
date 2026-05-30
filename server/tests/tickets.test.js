const request = require("supertest");
const createApp = require("../src/app");
const { sequelize, Ticket, User } = require("../src/models");

describe("Tickets API", () => {
  let app;
  let token;

  beforeAll(async () => {
    await sequelize.sync({ force: true });
    app = createApp();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  beforeEach(async () => {
    await Ticket.destroy({ where: {}, truncate: { cascade: true } });
    await User.destroy({ where: {}, truncate: { cascade: true } });

    const res = await request(app).post("/api/auth/register").send({
      name: "Owner",
      email: "owner@test.com",
      password: "secret123",
    });
    token = res.body.token;
  });

  const auth = () => ({ Authorization: `Bearer ${token}` });

  const sampleTicket = () => ({
    name: "Jesus Garcia",
    email: "jesus@tecnm.mx",
    github: "@jesusgg",
    avatar: "data:image/png;base64,XYZ",
  });

  describe("Proteccion JWT", () => {
    it("POST /api/tickets sin token responde 401", async () => {
      const res = await request(app)
        .post("/api/tickets")
        .send(sampleTicket());
      expect(res.status).toBe(401);
    });

    it("GET /api/tickets/me sin token responde 401", async () => {
      const res = await request(app).get("/api/tickets/me");
      expect(res.status).toBe(401);
    });

    it("DELETE /api/tickets/:id sin token responde 401", async () => {
      const res = await request(app).delete("/api/tickets/1");
      expect(res.status).toBe(401);
    });
  });

  describe("POST /api/tickets", () => {
    it("crea un ticket y asigna userId del autenticado (201)", async () => {
      const me = await request(app).get("/api/auth/me").set(auth());

      const res = await request(app)
        .post("/api/tickets")
        .set(auth())
        .send(sampleTicket());

      expect(res.status).toBe(201);
      expect(res.body.id).toBeDefined();
      expect(res.body.name).toBe("Jesus Garcia");
      expect(res.body.userId).toBe(me.body.id);
    });

    it("acepta ticket sin github ni avatar (campos opcionales)", async () => {
      const res = await request(app)
        .post("/api/tickets")
        .set(auth())
        .send({ name: "Solo", email: "solo@test.com" });
      expect(res.status).toBe(201);
      expect(res.body.github ?? null).toBeNull();
      expect(res.body.avatar ?? null).toBeNull();

      const stored = await Ticket.findByPk(res.body.id);
      expect(stored.github).toBeNull();
      expect(stored.avatar).toBeNull();
    });

    it("rechaza datos invalidos (400)", async () => {
      const res = await request(app)
        .post("/api/tickets")
        .set(auth())
        .send({ name: "x", email: "no-es-email" });

      expect(res.status).toBe(400);
      expect(res.body.message).toMatch(/datos invalidos/i);
      expect(Array.isArray(res.body.errors)).toBe(true);
    });

    it("ignora userId del body (no permite suplantar)", async () => {
      const me = await request(app).get("/api/auth/me").set(auth());

      const res = await request(app)
        .post("/api/tickets")
        .set(auth())
        .send({ ...sampleTicket(), userId: 9999 });

      expect(res.status).toBe(201);
      expect(res.body.userId).toBe(me.body.id);
    });
  });

  describe("GET /api/tickets/me", () => {
    it("devuelve array vacio si no hay tickets", async () => {
      const res = await request(app).get("/api/tickets/me").set(auth());
      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });

    it("devuelve los tickets propios mas recientes primero", async () => {
      const first = await request(app)
        .post("/api/tickets")
        .set(auth())
        .send({ ...sampleTicket(), name: "Primero" });

      await new Promise((r) => setTimeout(r, 1100));

      const second = await request(app)
        .post("/api/tickets")
        .set(auth())
        .send({ ...sampleTicket(), name: "Segundo" });

      const res = await request(app).get("/api/tickets/me").set(auth());

      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(2);
      expect(res.body[0].id).toBe(second.body.id);
      expect(res.body[1].id).toBe(first.body.id);
    });
  });

  describe("GET /api/tickets/:id", () => {
    it("devuelve el ticket propio (200)", async () => {
      const created = await request(app)
        .post("/api/tickets")
        .set(auth())
        .send(sampleTicket());

      const res = await request(app)
        .get(`/api/tickets/${created.body.id}`)
        .set(auth());

      expect(res.status).toBe(200);
      expect(res.body.id).toBe(created.body.id);
    });

    it("responde 404 si el ticket no existe", async () => {
      const res = await request(app).get("/api/tickets/9999").set(auth());
      expect(res.status).toBe(404);
    });
  });

  describe("DELETE /api/tickets/:id", () => {
    it("elimina un ticket propio (200)", async () => {
      const created = await request(app)
        .post("/api/tickets")
        .set(auth())
        .send(sampleTicket());

      const res = await request(app)
        .delete(`/api/tickets/${created.body.id}`)
        .set(auth());

      expect(res.status).toBe(200);
      const reloaded = await Ticket.findByPk(created.body.id);
      expect(reloaded).toBeNull();
    });

    it("responde 404 si el ticket no existe", async () => {
      const res = await request(app).delete("/api/tickets/9999").set(auth());
      expect(res.status).toBe(404);
    });
  });

  describe("Aislamiento entre usuarios", () => {
    let tokenA, tokenB, ticketA;

    beforeEach(async () => {
      const a = await request(app).post("/api/auth/register").send({
        name: "User A",
        email: "a@iso.com",
        password: "secret123",
      });
      tokenA = a.body.token;

      const b = await request(app).post("/api/auth/register").send({
        name: "User B",
        email: "b@iso.com",
        password: "secret123",
      });
      tokenB = b.body.token;

      const created = await request(app)
        .post("/api/tickets")
        .set({ Authorization: `Bearer ${tokenA}` })
        .send({ name: "Ticket de A", email: "a@iso.com" });
      ticketA = created.body;
    });

    it("User B no ve el ticket de A en su listado", async () => {
      const res = await request(app)
        .get("/api/tickets/me")
        .set({ Authorization: `Bearer ${tokenB}` });
      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });

    it("User A si ve su propio ticket", async () => {
      const res = await request(app)
        .get("/api/tickets/me")
        .set({ Authorization: `Bearer ${tokenA}` });
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(1);
      expect(res.body[0].id).toBe(ticketA.id);
    });

    it("User B recibe 403 al intentar ver ticket de A por ID", async () => {
      const res = await request(app)
        .get(`/api/tickets/${ticketA.id}`)
        .set({ Authorization: `Bearer ${tokenB}` });
      expect(res.status).toBe(403);
    });

    it("User B recibe 403 al intentar eliminar ticket de A", async () => {
      const res = await request(app)
        .delete(`/api/tickets/${ticketA.id}`)
        .set({ Authorization: `Bearer ${tokenB}` });
      expect(res.status).toBe(403);

      const stored = await Ticket.findByPk(ticketA.id);
      expect(stored).not.toBeNull();
    });
  });
});
