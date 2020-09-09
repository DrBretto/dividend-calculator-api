const StrategyService = {
  getAllStrategies(knex) {
    return knex.select("*").from("strategy");
  },

  getUserStrategies(knex, userId) {
    console.log("getUserStrategies -> userId", userId)
    return knex
    .from("strategy")
    .select("strategy.id","strategy.title", "strategy.author_id")
    .where("strategy.author_id", userId)
  },


  //!------ NYI
  insertStrategy(knex, newStrategy) {
    return knex
      .insert(newStrategy)
      .into("strategy")
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },


  getById(knex, id) {
    return knex.from("strategy").select("*").where("id", id).first();
  },

  getByUser(knex, userId) {
    return knex.from("strategy").select("*").where("author_id", userId);
  },

    //!------ NYI
  deleteStrategy(knex, id) {
    return knex("strategy").where({ id }).delete();
  },

    //!------ NYI
  updateStrategy(knex, id, newStrategyFields) {
    return knex("strategy").where({ id }).update(newStrategyFields);
  },
};

module.exports = StrategyService;
