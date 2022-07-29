const parking = require("../models/parking.js");

exports.getAll = async (ctx) => {
  try {
    console.log("get1");
    ctx.body = await parking.getAll();
  } catch (e) {
    console.log(e, "fail");
    ctx.status = 500;
  }
};
