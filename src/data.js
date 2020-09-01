require("dotenv").config();
const knex = require("knex");
const DividendService = require("./DividendService");

const knexInstance = knex({
  client: "pg",
  connection: process.env.DB_URL,
});

console.log(DividendService.getAllArticles());
