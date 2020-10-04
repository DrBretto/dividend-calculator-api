const knex = require("knex");
const app = require("../src/app");
const helpers = require("./test-helpers");

describe("Stocks Endpoints", function () {
  let db;

  const { testStrategies, testUsers } = helpers.makeStrategiesFixtures();

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DB_URL,
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  before("cleanup", () => helpers.cleanTables(db));

  afterEach("cleanup", () => helpers.cleanTables(db));

  describe(`POST /api/stocks`, () => {
    beforeEach("insert strategies", () =>
      helpers.seedStrategiesTables(db, testUsers, testStrategies)
    );

    it(`creates an stock, responding with 201 and the new stock`, function () {
      this.retries(3);
      const testStrategy = testStrategies[0];
      const testUser = testUsers[0];
      const newStock = {
        text: "Test new stock",
        strategy_id: testStrategy.id,
      };
      return supertest(app)
        .post("/api/stocks")
        .set("Authorization", helpers.makeAuthHeader(testUsers[0]))
        .send(newStock)
        .expect(201)
        .expect((res) => {
          expect(res.body).to.have.property("id");
          expect(res.body.text).to.eql(newStock.text);
          expect(res.body.strategy_id).to.eql(newStock.strategy_id);
          expect(res.body.user.id).to.eql(testUser.id);
          expect(res.headers.location).to.eql(`/api/stocks/${res.body.id}`);
          const expectedDate = new Date().toLocaleString("en", {
            timeZone: "UTC",
          });
          const actualDate = new Date(res.body.date_created).toLocaleString();
          expect(actualDate).to.eql(expectedDate);
        })
        .expect((res) =>
          db
            .from("blogful_stocks")
            .select("*")
            .where({ id: res.body.id })
            .first()
            .then((row) => {
              expect(row.text).to.eql(newStock.text);
              expect(row.strategy_id).to.eql(newStock.strategy_id);
              expect(row.user_id).to.eql(testUser.id);
              const expectedDate = new Date().toLocaleString("en", {
                timeZone: "UTC",
              });
              const actualDate = new Date(row.date_created).toLocaleString();
              expect(actualDate).to.eql(expectedDate);
            })
        );
    });

    const requiredFields = ["text", "strategy_id"];

    requiredFields.forEach((field) => {
      const testStrategy = testStrategies[0];
      const testUser = testUsers[0];
      const newStock = {
        text: "Test new stock",
        strategy_id: testStrategy.id,
      };

      it(`responds with 400 and an error message when the '${field}' is missing`, () => {
        delete newStock[field];

        return supertest(app)
          .post("/api/stocks")
          .set("Authorization", helpers.makeAuthHeader(testUser))
          .send(newStock)
          .expect(400, {
            error: `Missing '${field}' in request body`,
          });
      });
    });
  });
});
