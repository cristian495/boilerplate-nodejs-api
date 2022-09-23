const supertest = require("supertest");
const app = require("./../../api");
const { runVirtualMongoSetup } = require("../../tests/helpers");
const { userMock } = require("../../tests/mocks");
const { signJwt } = require("../../utils/jwt.utils");
const { createUser } = require("../../services/db/user.service");
const { set } = require("./../../api");

runVirtualMongoSetup();
const endpoint = "/protected";
const request = supertest(app);

describe(`POST ${endpoint}`, () => {
  it("Should return 401 if token is invalid", async () => {
    const { body } = await request.post(endpoint).expect(401);

    expect(body.success).toBe(false);
  });

  it("Should access to protected route", async () => {
    const userLogged = await createUser(userMock);
    const token = signJwt({ userLogged }, { expiresIn: "1d" });
    const { body } = await request
      .get(endpoint)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(body.success).toBe(true);
    expect(body.message).toBe("protected route");
  });
});
