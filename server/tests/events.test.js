const request = require("supertest");
const createApp = require("../src/app");
const { sequelize, Event, User } = require("../src/models");

describe("Events API", () => {
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
    await Event.destroy({ where: {}, truncate: true });
    await User.destroy({ where: {}, truncate: true });

    const res = await request(app).post("/api/auth/register").send({
      name: "Owner",
      email: "owner@test.com",
      password: "secret123",
    });
    token = res.body.token;
  });

  const auth = () => ({ Authorization: `Bearer ${token}` });

  const sampleEvent = () => ({
    title: "Conferencia de IA",
    description: "Charla magistral sobre IA aplicada",
    location: "Auditorio TECNM Celaya",
    date: "2026-09-15T18:00:00.000Z",
  });

  describe("Proteccion JWT", () => {
    it("GET /api/events sin token responde 401", async () => {
      const res = await request(app).get("/api/events");
      expect(res.status).toBe(401);
    });

    it("POST /api/events sin token responde 401", async () => {
      const res = await request(app)
        .post("/api/events")
        .send(sampleEvent());
      expect(res.status).toBe(401);
    });

    it("DELETE /api/events/:id sin token responde 401", async () => {
      const res = await request(app).delete("/api/events/1");
      expect(res.status).toBe(401);
    });
  });

  describe("GET /api/events", () => {
    it("devuelve array vacio si el usuario no tiene eventos", async () => {
      const res = await request(app).get("/api/events").set(auth());
      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });

    it("devuelve solo los eventos del usuario autenticado", async () => {
      await request(app).post("/api/events").set(auth()).send(sampleEvent());

      const res = await request(app).get("/api/events").set(auth());

      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(1);
      expect(res.body[0].title).toBe("Conferencia de IA");
      expect(res.body[0].userId).toBeDefined();
    });
  });

  describe("POST /api/events", () => {
    it("crea un evento y asigna userId del autenticado (201)", async () => {
      const me = await request(app).get("/api/auth/me").set(auth());

      const res = await request(app)
        .post("/api/events")
        .set(auth())
        .send(sampleEvent());

      expect(res.status).toBe(201);
      expect(res.body.id).toBeDefined();
      expect(res.body.userId).toBe(me.body.id);

      const stored = await Event.findByPk(res.body.id);
      expect(stored.userId).toBe(me.body.id);
    });

    it("ignora userId si viene en el body (no permite suplantar)", async () => {
      const res = await request(app)
        .post("/api/events")
        .set(auth())
        .send({ ...sampleEvent(), userId: 9999 });

      const me = await request(app).get("/api/auth/me").set(auth());

      expect(res.status).toBe(201);
      expect(res.body.userId).toBe(me.body.id);
    });

    it("rechaza datos invalidos (400) con lista de errors", async () => {
      const res = await request(app)
        .post("/api/events")
        .set(auth())
        .send({ title: "x", description: "y", location: "", date: "" });

      expect(res.status).toBe(400);
      expect(res.body.message).toMatch(/datos invalidos/i);
      expect(Array.isArray(res.body.errors)).toBe(true);
    });
  });

  describe("GET /api/events/:id", () => {
    it("devuelve el evento propio (200)", async () => {
      const created = await request(app)
        .post("/api/events")
        .set(auth())
        .send(sampleEvent());

      const res = await request(app)
        .get(`/api/events/${created.body.id}`)
        .set(auth());

      expect(res.status).toBe(200);
      expect(res.body.id).toBe(created.body.id);
    });

    it("responde 404 si el evento no existe", async () => {
      const res = await request(app).get("/api/events/9999").set(auth());
      expect(res.status).toBe(404);
    });
  });

  describe("PUT /api/events/:id", () => {
    it("actualiza un evento propio (200)", async () => {
      const created = await request(app)
        .post("/api/events")
        .set(auth())
        .send(sampleEvent());

      const res = await request(app)
        .put(`/api/events/${created.body.id}`)
        .set(auth())
        .send({ title: "Titulo actualizado" });

      expect(res.status).toBe(200);
      expect(res.body.event.title).toBe("Titulo actualizado");
    });

    it("responde 404 si el evento no existe", async () => {
      const res = await request(app)
        .put("/api/events/9999")
        .set(auth())
        .send({ title: "x" });
      expect(res.status).toBe(404);
    });
  });

  describe("DELETE /api/events/:id", () => {
    it("elimina un evento propio (200)", async () => {
      const created = await request(app)
        .post("/api/events")
        .set(auth())
        .send(sampleEvent());

      const res = await request(app)
        .delete(`/api/events/${created.body.id}`)
        .set(auth());

      expect(res.status).toBe(200);
      const reloaded = await Event.findByPk(created.body.id);
      expect(reloaded).toBeNull();
    });

    it("responde 404 si el evento no existe", async () => {
      const res = await request(app).delete("/api/events/9999").set(auth());
      expect(res.status).toBe(404);
    });
  });

  describe("Aislamiento entre usuarios", () => {
    let tokenA, tokenB, eventA;

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
        .post("/api/events")
        .set({ Authorization: `Bearer ${tokenA}` })
        .send(sampleEvent());
      eventA = created.body;
    });

    it("User B no ve el evento de A en su listado", async () => {
      const res = await request(app)
        .get("/api/events")
        .set({ Authorization: `Bearer ${tokenB}` });

      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });

    it("User A si ve su propio evento", async () => {
      const res = await request(app)
        .get("/api/events")
        .set({ Authorization: `Bearer ${tokenA}` });

      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(1);
      expect(res.body[0].id).toBe(eventA.id);
    });

    it("User B recibe 403 al intentar ver evento de A por ID", async () => {
      const res = await request(app)
        .get(`/api/events/${eventA.id}`)
        .set({ Authorization: `Bearer ${tokenB}` });
      expect(res.status).toBe(403);
    });

    it("User B recibe 403 al intentar editar evento de A", async () => {
      const res = await request(app)
        .put(`/api/events/${eventA.id}`)
        .set({ Authorization: `Bearer ${tokenB}` })
        .send({ title: "Hijack" });
      expect(res.status).toBe(403);
    });

    it("User B recibe 403 al intentar eliminar evento de A", async () => {
      const res = await request(app)
        .delete(`/api/events/${eventA.id}`)
        .set({ Authorization: `Bearer ${tokenB}` });
      expect(res.status).toBe(403);

      const stored = await Event.findByPk(eventA.id);
      expect(stored).not.toBeNull();
    });
  });
});
