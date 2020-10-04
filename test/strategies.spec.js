const knex = require("knex");
const app = require("../src/app");
const helpers = require("./test-helpers");

describe("Strategies Endpoints", function () {
  let db;

  const {
    testUsers,
    testStrategies,
    testStocks,
  } = helpers.makeStrategiesFixtures();

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

  describe(`GET /api/strategies`, () => {
    context(`Given no strategies`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app).get("/api/strategies").expect(200, []);
      });
    });

    context("Given there are strategies in the database", () => {
      beforeEach("insert strategies", () =>
        helpers.seedStrategiesTables(db, testUsers, testStrategies, testStocks)
      );

      it("responds with 200 and all of the strategies", () => {
        const expectedStrategies = testStrategies.map((strategy) =>
          helpers.makeExpectedStrategy(testUsers, strategy, testStocks)
        );
        return supertest(app)
          .get("/api/strategies")
          .expect(200, expectedStrategies);
      });
    });

    context(`Given an XSS attack strategy`, () => {
      const testUser = helpers.makeUsersArray()[1];
      const {
        maliciousStrategy,
        expectedStrategy,
      } = helpers.makeMaliciousStrategy(testUser);

      beforeEach("insert malicious strategy", () => {
        return helpers.seedMaliciousStrategy(db, testUser, maliciousStrategy);
      });

      it("removes XSS attack content", () => {
        return supertest(app)
          .get(`/api/strategies`)
          .expect(200)
          .expect((res) => {
            expect(res.body[0].title).to.eql(expectedStrategy.title);
            expect(res.body[0].content).to.eql(expectedStrategy.content);
          });
      });
    });
  });

  describe(`GET /api/strategies/:strategy_id`, () => {
    context(`Given no strategies`, () => {
      beforeEach(() => helpers.seedUsers(db, testUsers));

      it(`responds with 404`, () => {
        const strategyId = 123456;
        return supertest(app)
          .get(`/api/strategies/${strategyId}`)
          .set("Authorization", helpers.makeAuthHeader(testUsers[0]))
          .expect(404, { error: `Strategy doesn't exist` });
      });
    });

    context("Given there are strategies in the database", () => {
      beforeEach("insert strategies", () =>
        helpers.seedStrategiesTables(db, testUsers, testStrategies, testStocks)
      );

      it("responds with 200 and the specified strategy", () => {
        const strategyId = 2;
        const expectedStrategy = helpers.makeExpectedStrategy(
          testUsers,
          testStrategies[strategyId - 1],
          testStocks
        );

        return supertest(app)
          .get(`/api/strategies/${strategyId}`)
          .set("Authorization", helpers.makeAuthHeader(testUsers[0]))
          .expect(200, expectedStrategy);
      });
    });

    context(`Given an XSS attack strategy`, () => {
      const testUser = helpers.makeUsersArray()[1];
      const {
        maliciousStrategy,
        expectedStrategy,
      } = helpers.makeMaliciousStrategy(testUser);

      beforeEach("insert malicious strategy", () => {
        return helpers.seedMaliciousStrategy(db, testUser, maliciousStrategy);
      });

      it("removes XSS attack content", () => {
        return supertest(app)
          .get(`/api/strategies/${maliciousStrategy.id}`)
          .set("Authorization", helpers.makeAuthHeader(testUser))
          .expect(200)
          .expect((res) => {
            expect(res.body.title).to.eql(expectedStrategy.title);
            expect(res.body.content).to.eql(expectedStrategy.content);
          });
      });
    });
  });

  describe(`GET /api/strategies/:strategy_id/stocks`, () => {
    context(`Given no strategies`, () => {
      beforeEach(() => helpers.seedUsers(db, testUsers));

      it(`responds with 404`, () => {
        const strategyId = 123456;
        return supertest(app)
          .get(`/api/strategies/${strategyId}/stocks`)
          .set("Authorization", helpers.makeAuthHeader(testUsers[0]))
          .expect(404, { error: `Strategy doesn't exist` });
      });
    });

    context("Given there are stocks for strategy in the database", () => {
      beforeEach("insert strategies", () =>
        helpers.seedStrategiesTables(db, testUsers, testStrategies, testStocks)
      );

      it("responds with 200 and the specified stocks", () => {
        const strategyId = 1;
        const expectedStocks = helpers.makeExpectedStrategyStocks(
          testUsers,
          strategyId,
          testStocks
        );

        return supertest(app)
          .get(`/api/strategies/${strategyId}/stocks`)
          .set("Authorization", helpers.makeAuthHeader(testUsers[0]))
          .expect(200, expectedStocks);
      });
    });
  });
});
