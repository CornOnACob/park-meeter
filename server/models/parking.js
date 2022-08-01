const db = require("./index");

exports.getAll = async () => {
  console.log("GET REQUEST");
  const res = await db.query("SELECT * FROM parking");
  console.log('GET REQUEST SUCCESSFUL');
  return res.rows;
};
