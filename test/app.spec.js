const app = require("../src/app");
const supertest = require("supertest");
const { expect } = require("chai");

describe("App", () => {
  it('GET / responds with 200containing "Hello, world!"', () => {
    return supertest(app).get("/").expect(200, "Hello, world!");
  });
});

describe("GET /stock", () => {
  it("should return an array of stocks", () => {
    return supertest(app)
      .get("/stocks")
      .expect(200)
      .expect("Content-Type", /json/);
  });
});
