const { Client } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const db = new Client({
  user: process.env.DB_USER,
  host: "localhost",
  database: "parkingdb",
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

db.connect(() => console.log("postgresql db connected"));

module.exports = db;
