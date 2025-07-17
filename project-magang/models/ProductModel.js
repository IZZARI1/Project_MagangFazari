// models/ProductModel.js
const knex = require("../db");

module.exports = {
  getAll: async () => {
    return await knex("products").select("*").orderBy("id", "desc");
  },

  getById: async (id) => {
    return await knex("products").where("id", id).first();
  },

  add: async (name, price, description) => {
    await knex("products").insert({ name, price, description });
  },

  update: async (id, name, price, description) => {
    await knex("products").where("id", id).update({ name, price, description });
  },

  delete: async (id) => {
    await knex("products").where("id", id).del();
  },
};
