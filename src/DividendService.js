const DividendService = {
  getAllArticles(knex) {
    return knex.select("*").from("dividend");
  },
};

module.exports = ArticlesService;
