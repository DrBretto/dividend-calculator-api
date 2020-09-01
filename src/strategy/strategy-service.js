const NotesService = {
  getAllStrategies(knex) {
    return knex.select("*").from("strategy");
  },

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

  deleteStrategy(knex, id) {
    return knex("strategy").where({ id }).delete();
  },

  updateStrategy(knex, id, newStrategyFields) {
    return knex("strategy").where({ id }).update(newStrategyFields);
  },
};

module.exports = NotesService;
