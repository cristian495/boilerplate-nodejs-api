const supertest = require("supertest");
const app = require("./../../../api");
const { runVirtualMongoSetup } = require("../../../tests/helpers");
const { userMock } = require("../../../tests/mocks");

runVirtualMongoSetup();
const endpoint = "/auth/singup";
const request = supertest(app);

describe(`POST ${endpoint}`, () => {
  it("Should return 400 error if missing fields", async () => {
    const { body } = await request.post(endpoint).expect(400);

    expect(body.success).toBe(false);
    expect(body.detail).toMatchObject({
      email: ["El campo email es obligatorio."],
      password: ["El campo password es obligatorio."],
    });
  });

  it("Should return 400 error if email field is not a valid email", async () => {
    const { body } = await request
      .post(endpoint)
      .send({ email: "invalid", password: "secret" })
      .expect(400);

    expect(body.success).toBe(false);
    expect(body.detail).toMatchObject({
      email: ["El campo email no es un correo válido."],
    });
  });

  it("Shoult return user created", async () => {
    const { body } = await request.post(endpoint).send(userMock).expect(201);

    expect(body.success).toBe(true);
    expect(body.user).toMatchObject(userMock);
  });
});
