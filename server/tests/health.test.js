const request = require("supertest");
const createApp = require("../src/app");
const { sequelize } = require("../src/models");

describe("Bootstrap", () => {
  let app;

  beforeAll(async () => {
    await sequelize.sync({ force: true });
    app = createApp();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("GET / responde 200 con status ok", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
  });

  it("Sequelize esta usando sqlite en tests", () => {
    expect(sequelize.getDialect()).toBe("sqlite");
  });
});
