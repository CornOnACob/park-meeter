const { Client } = require("pg");
require("dotenv").config();

const db = new Client({
  user: process.env.DB_USER,
  host: "localhost",
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

db.connect(() => console.log("postgresql db connected"));

module.exports = db;
