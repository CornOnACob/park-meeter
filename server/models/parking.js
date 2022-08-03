const db = require("./index");
require("dotenv").config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, { apiVersion: "2020-08-27" });

exports.getAll = async () => {
  const res = await db.query("SELECT * FROM parking");
  return res.rows;
};

exports.checkout = async (ctx) => {
  const amount = +ctx.url.substring(10);
  await stripe.paymentIntents.create({
    amount: amount,
    currency: 'cad',
    payment_method_types: ['card'],
  });
  ctx.status = 200;
}
