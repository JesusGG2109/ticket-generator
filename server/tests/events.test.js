const request = require("supertest");
const createApp = require("../src/app");
const { sequelize, Event } = require("../src/models");

describe("Events API", () => {
  let app;

  beforeAll(async () => {
    await sequelize.sync({ force: true });
    app = createApp();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  beforeEach(async () => {
    await Event.destroy({ where: {}, truncate: true });
  });

  const sampleEvent = () => ({
    title: "Conferencia de IA",
    description: "Charla magistral sobre IA aplicada",
    location: "Auditorio TECNM Celaya",
    date: "2026-09-15T18:00:00.000Z",
  });

  describe("GET /api/events", () => {
    it("devuelve array vacio si no hay eventos", async () => {
      const res = await request(app).get("/api/events");
      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });

    it("devuelve los eventos existentes", async () => {
      await Event.create(sampleEvent());

      const res = await request(app).get("/api/events");

      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(1);
      expect(res.body[0].title).toBe("Conferencia de IA");
    });
  });

  describe("POST /api/events", () => {
    it("crea un evento con datos validos (201)", async () => {
      const res = await request(app).post("/api/events").send(sampleEvent());

      expect(res.status).toBe(201);
      expect(res.body.id).toBeDefined();
      expect(res.body.title).toBe("Conferencia de IA");

      const stored = await Event.findByPk(res.body.id);
      expect(stored).not.toBeNull();
    });

    it("rechaza datos invalidos (400) con lista de errors", async () => {
      const res = await request(app).post("/api/events").send({
        title: "x",
        description: "y",
        location: "",
        date: "",
      });

      expect(res.status).toBe(400);
      expect(res.body.message).toMatch(/datos invalidos/i);
      expect(Array.isArray(res.body.errors)).toBe(true);
    });
  });

  describe("GET /api/events/:id", () => {
    it("devuelve el evento solicitado (200)", async () => {
      const created = await Event.create(sampleEvent());

      const res = await request(app).get(`/api/events/${created.id}`);

      expect(res.status).toBe(200);
      expect(res.body.id).toBe(created.id);
    });

    it("responde 404 si el evento no existe", async () => {
      const res = await request(app).get("/api/events/9999");
      expect(res.status).toBe(404);
      expect(res.body.message).toMatch(/no encontrado/i);
    });
  });

  describe("PUT /api/events/:id", () => {
    it("actualiza un evento existente (200)", async () => {
      const created = await Event.create(sampleEvent());

      const res = await request(app)
        .put(`/api/events/${created.id}`)
        .send({ title: "Titulo actualizado" });

      expect(res.status).toBe(200);
      expect(res.body.event.title).toBe("Titulo actualizado");

      const reloaded = await Event.findByPk(created.id);
      expect(reloaded.title).toBe("Titulo actualizado");
    });

    it("responde 404 si el evento no existe", async () => {
      const res = await request(app)
        .put("/api/events/9999")
        .send({ title: "x" });
      expect(res.status).toBe(404);
    });
  });

  describe("DELETE /api/events/:id", () => {
    it("elimina un evento existente (200)", async () => {
      const created = await Event.create(sampleEvent());

      const res = await request(app).delete(`/api/events/${created.id}`);

      expect(res.status).toBe(200);
      expect(res.body.message).toMatch(/eliminado/i);

      const reloaded = await Event.findByPk(created.id);
      expect(reloaded).toBeNull();
    });

    it("responde 404 si el evento no existe", async () => {
      const res = await request(app).delete("/api/events/9999");
      expect(res.status).toBe(404);
    });
  });
});
