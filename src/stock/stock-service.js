const StockService = {
  getAllStocks(knex) {
    return knex.select("*").from("stock");
  },

  insertStock(knex, newStock) {
    return knex
      .insert(newStock)
      .into("stock")
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },

  getById(knex, id) {
    return knex.from("stock").select("*").where("id", id).first();
  },

  deleteNotes(knex, id) {
    return knex("stock").where({ id }).delete();
  },

  updateNotes(knex, id, newStockFields) {
    return knex("stock").where({ id }).update(newStockFields);
  },
};

module.exports = NotesService;
