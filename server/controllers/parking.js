const parking = require("../models/parking.js");

exports.getAll = async (ctx) => {
  try {
    ctx.body = await parking.getAll();
  } catch (e) {
    console.log(e, "Error: Unable to fetch parking data");
    ctx.status = 500;
  }
};

exports.checkoutParking = async (ctx) => {
  try {
    ctx.body = await parking.checkout(ctx);
  } catch (e) {
    console.log(e, "Error: Unable to process payment");
    ctx.status = 500;
  }
}
