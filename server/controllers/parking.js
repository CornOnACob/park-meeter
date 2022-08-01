const parking = require("../models/parking.js");
require("dotenv").config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, { apiVersion: "2020-08-27" });

exports.getAll = async (ctx) => {
  try {
    console.log("get");
    ctx.body = await parking.getAll();
  } catch (e) {
    console.log(e, "fail");
    ctx.status = 500;
  }
};

exports.checkoutParking = async (ctx) => {
  const amount = +ctx.url.substring(10);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: 'cad',
    payment_method_types: ['card'],
  });
  ctx.status = 200;
  ctx.body = { clientSecret: paymentIntent.client_secret };
}
