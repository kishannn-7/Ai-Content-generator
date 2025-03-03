const express = require("express");
const stripeRouter = express.Router();
const isAuth = require("../middlewares/isAuth");
const checkAPiRequestLimit = require("../middlewares/checkApiRequestLimit");
const { handleStripePayment, handleFreeSubscription, verifyPayment } = require("../controllers/handleStripePayment");



stripeRouter.post("/checkout", isAuth, handleStripePayment);
stripeRouter.post("/free-plan", isAuth, handleFreeSubscription);
stripeRouter.post("/verify-payment/:paymentId", isAuth, verifyPayment);


module.exports = stripeRouter