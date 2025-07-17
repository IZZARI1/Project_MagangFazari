require("dotenv").config(); // WAJIB ADA!

const knex = require("knex")({
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD, // Sesuai nama baru
    database: process.env.DB_NAME,
    port: 5432,
  },
});

module.exports = knex;
