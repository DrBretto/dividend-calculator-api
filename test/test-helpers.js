const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function makeUsersArray() {
  return [
    {
      id: 1,
      user_name: "test-user-1",
      full_name: "Test user 1",
      nickname: "TU1",
      password: "$2a$12$lbG0Y4lpgmrT83oDg4HELuVAA7FNdwyMUUqXVjcvI/jW942lvKR/m",
      date_created: new Date("2029-01-22T16:28:32.615Z"),
    },
    {
      id: 2,
      user_name: "test-user-2",
      full_name: "Test user 2",
      nickname: "TU2",
      password: "Passw0rd!",
      date_created: new Date("2029-01-22T16:28:32.615Z"),
    },
    {
      id: 3,
      user_name: "test-user-3",
      full_name: "Test user 3",
      nickname: "TU3",
      password: "Passw0rd!",
      date_created: new Date("2029-01-22T16:28:32.615Z"),
    },
    {
      id: 4,
      user_name: "test-user-4",
      full_name: "Test user 4",
      nickname: "TU4",
      password: "Passw0rd!",
      date_created: new Date("2029-01-22T16:28:32.615Z"),
    },
  ];
}

function makeStrategiesArray(users) {
  return [
    {
      id: 100,
      title: "First strategy",
      author_id: "$2a$12$lbG0Y4lpgmrT83oDg4HELuVAA7FNdwyMUUqXVjcvI/jW942lvKR/m",
      date_created: new Date("2029-01-22T16:28:32.615Z"),
    },
    {
      id: 200,
      title: "Second strategy",
      author_id: "$2a$12$lbG0Y4lpgmrT83oDg4HELuVAA7FNdwyMUUqXVjcvI/jW942lvKR/m",
      date_created: new Date("2029-01-22T16:28:32.615Z"),
    },
    {
      id: 300,
      title: "Third strategy",
      author_id: "$2a$12$lbG0Y4lpgmrT83oDg4HELuVAA7FNdwyMUUqXVjcvI/jW942lvKR/m",
      date_created: new Date("2029-01-22T16:28:32.615Z"),
    },
    {
      id: 400,
      title: "Fourth strategy",
      author_id: "$2a$12$lbG0Y4lpgmrT83oDg4HELuVAA7FNdwyMUUqXVjcvI/jW942lvKR/m",
      date_created: new Date("2029-01-22T16:28:32.615Z"),
    },
  ];
}

function makeStocksArray(users, strategies) {
  return [
    {
      id: 100,
      ticker: "MSFT",
      industry: "Technology",
      shares: 40,
      price: 280.51,
      color: "#0088FE",
      yield: 1.15,
      eps1: 5.18,
      author_id: "$2a$12$lbG0Y4lpgmrT83oDg4HELuVAA7FNdwyMUUqXVjcvI/jW942lvKR/m",
      date_created: new Date("2029-01-22T16:28:32.615Z"),
      strategy_id: strategies[0].id,
    },
    {
      id: 200,
      ticker: "BLAH",
      industry: "Other",
      shares: 10,
      price: 451,
      color: "#4444FE",
      yield: 1.5,
      eps1: 1.24,
      author_id: "$2a$12$lbG0Y4lpgmrT83oDg4HELuVAA7FNdwyMUUqXVjcvI/jW942lvKR/m",
      date_created: new Date("2029-01-22T16:28:32.615Z"),
      strategy_id: strategies[0].id,
    },
  ];
}
function makeExpectedStrategy(users, strategy, stocks = []) {
  const author = users.find((user) => user.id === strategy.author_id);

  const number_of_stocks = stocks.filter(
    (stock) => stock.strategy_id === strategy.id
  ).length;

  return {
    id: strategy.id,
    style: strategy.style,
    title: strategy.title,
    content: strategy.content,
    date_created: strategy.date_created.toISOString(),
    number_of_stocks,
    author: {
      id: author.id,
      user_name: author.user_name,
      full_name: author.full_name,
      nickname: author.nickname,
      date_created: author.date_created.toISOString(),
      date_modified: author.date_modified || null,
    },
  };
}

function makeExpectedStrategyStocks(users, strategyId, stocks) {
  const expectedStocks = stocks.filter(
    (stock) => stock.strategy_id === strategyId
  );

  return expectedStocks.map((stock) => {
    const stockUser = users.find((user) => user.id === stock.user_id);
    return {
      id: stock.id,
      text: stock.text,
      date_created: stock.date_created.toISOString(),
      user: {
        id: stockUser.id,
        user_name: stockUser.user_name,
        full_name: stockUser.full_name,
        nickname: stockUser.nickname,
        date_created: stockUser.date_created.toISOString(),
        date_modified: stockUser.date_modified || null,
      },
    };
  });
}

function makeMaliciousStrategy(user) {
  const maliciousStrategy = {
    id: 911,
    style: "How-to",
    date_created: new Date(),
    title: 'Naughty naughty very naughty <script>alert("xss");</script>',
    author_id: user.id,
    content: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
  };
  const expectedStrategy = {
    ...makeExpectedStrategy([user], maliciousStrategy),
    title:
      'Naughty naughty very naughty &lt;script&gt;alert("xss");&lt;/script&gt;',
    content: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`,
  };
  return {
    maliciousStrategy,
    expectedStrategy,
  };
}

function makeStrategiesFixtures() {
  const testUsers = makeUsersArray();
  const testStrategies = makeStrategiesArray(testUsers);
  const testStocks = makeStocksArray(testUsers, testStrategies);
  return { testUsers, testStrategies, testStocks };
}

function cleanTables(db) {
  return db.transaction((trx) =>
    trx
      .raw(
        `TRUNCATE
        blogful_strategies,
        blogful_users,
        blogful_stocks
      `
      )
      .then(() =>
        Promise.all([
          trx.raw(
            `ALTER SEQUENCE blogful_strategies_id_seq minvalue 0 START WITH 1`
          ),
          trx.raw(
            `ALTER SEQUENCE blogful_users_id_seq minvalue 0 START WITH 1`
          ),
          trx.raw(
            `ALTER SEQUENCE blogful_stocks_id_seq minvalue 0 START WITH 1`
          ),
          trx.raw(`SELECT setval('blogful_strategies_id_seq', 0)`),
          trx.raw(`SELECT setval('blogful_users_id_seq', 0)`),
          trx.raw(`SELECT setval('blogful_stocks_id_seq', 0)`),
        ])
      )
  );
}

function seedUsers(db, users) {
  const preppedUsers = users.map((user) => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1),
  }));
  return db
    .into("blogful_users")
    .insert(preppedUsers)
    .then(() =>
      // update the auto sequence to stay in sync
      db.raw(`SELECT setval('blogful_users_id_seq', ?)`, [
        users[users.length - 1].id,
      ])
    );
}

function seedStrategiesTables(db, users, strategies, stocks = []) {
  // use a transaction to group the queries and auto rollback on any failure
  return db.transaction(async (trx) => {
    await seedUsers(trx, users);
    await trx.into("blogful_strategies").insert(strategies);
    // update the auto sequence to match the forced id values
    await trx.raw(`SELECT setval('blogful_strategies_id_seq', ?)`, [
      strategies[strategies.length - 1].id,
    ]);
    // only insert stocks if there are some, also update the sequence counter
    if (stocks.length) {
      await trx.into("blogful_stocks").insert(stocks);
      await trx.raw(`SELECT setval('blogful_stocks_id_seq', ?)`, [
        stocks[stocks.length - 1].id,
      ]);
    }
  });
}

function seedMaliciousStrategy(db, user, strategy) {
  return seedUsers(db, [user]).then(() =>
    db.into("blogful_strategies").insert([strategy])
  );
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: user.user_name,
    algorithm: "HS256",
  });
  return `Bearer ${token}`;
}

module.exports = {
  makeUsersArray,
  makeStrategiesArray,
  makeExpectedStrategy,
  makeExpectedStrategyStocks,
  makeMaliciousStrategy,
  makeStocksArray,

  makeStrategiesFixtures,
  cleanTables,
  seedStrategiesTables,
  seedMaliciousStrategy,
  makeAuthHeader,
  seedUsers,
};
