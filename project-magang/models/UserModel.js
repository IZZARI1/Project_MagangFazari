// models/UserModel.js
const knex = require("../db");
const bcrypt = require("bcrypt");

const UserModel = {
  async findByEmail(email) {
    return await knex("users").where({ email }).first();
  },

  async getAll() {
    return await knex("users").select("*").orderBy("id");
  },

  async getById(id) {
    return await knex("users").where({ id }).first();
  },

  async create(email, password, role = "user") {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await knex("users").insert({
      email,
      password: hashedPassword,
      role,
    });
  },

  async update(id, email, password, role, oldPass) {
    // console.log(password)
    const hashedPassword = await bcrypt.hash(password, 10);
    if (password === oldPass) {
      return await knex("users")
        .where({ id })
        .update({ email, password: oldPass, role });
    }
    return await knex("users")
      .where({ id })
      .update({ email, password: hashedPassword, role });
  },

  async delete(id) {
    return await knex("users").where({ id }).del();
  },
};

module.exports = UserModel;
