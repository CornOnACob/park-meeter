const db = require("./index");

exports.getAll = async () => {
  console.log("GET REQUEST!");
  const res = await db.query("SELECT * FROM parking");
  return res.rows;
};
