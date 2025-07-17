// models/OrderModel.js
const knex = require("../db");

module.exports = {
  add: async (userId, productId, quantity) => {
    await knex("orders").insert({
      user_id: userId,
      product_id: productId,
      quantity: quantity,
    });
  },

  getByUser: async (userId) => {
    return await knex("orders as o")
      .join("products as p", "o.product_id", "p.id")
      .select(
        "o.id",
        "p.name",
        "o.quantity",
        "p.price",
        knex.raw("(o.quantity * p.price) as total")
      )
      .where("o.user_id", userId)
      .orderBy("o.id", "desc");
  },

  getAll: async () => {
    return await knex("orders as o")
      .join("users as u", "o.user_id", "u.id")
      .join("products as p", "o.product_id", "p.id")
      .select(
        "o.id",
        "u.email",
        "p.name",
        "o.quantity",
        "p.price",
        knex.raw("(o.quantity * p.price) as total")
      )
      .orderBy("o.id", "desc");
  },

  getById: async (id) => {
    const result = await knex("orders").where("id", id).first();
    return result;
  },

  delete: async (orderId) => {
    await knex("orders").where("id", orderId).del();
  },
};
