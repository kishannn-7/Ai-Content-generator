const asyncHandler = require("express-async-handler");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const User = require("../models/User");
const { calculateNextBillingDate } = require("../utils/calculateNextBillingDate");
const { Renewsubscription } = require("../utils/Renewsubscription");
const Payment = require("../models/Payment");

//-----Stripe payment-----
const handleStripePayment = asyncHandler(async (req, res) => {
    const { amount, subscriptionPlan } = req.body;
    //get the user
    const user = req?.user;
    try {
        //create payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Number(amount) * 100,
            currency: "usd",
            metadata: {
                userId: user?._id?.toString(),
                userEmail: user?.email,
                subscriptionPlan,
            },

        });

        res.status(200).json({
            clientSecret: paymentIntent.client_secret,
            paymentId: paymentIntent.id,
            metadata: paymentIntent.metadata
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: e.message });
    }

})
//-----Verify payment-----
const verifyPayment = asyncHandler(async (req, res) => {
    const { paymentId } = req.params;
    try {
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentId);
        // console.log(paymentIntent);
        if (paymentIntent.status === "succeeded") {
            //get the info metada
            const metadata = paymentIntent?.metadata;
            const subscriptionPlan = metadata?.subscriptionPlan;
            const userEmail = metadata?.userEmail;
            const userId = metadata?.userId;

            //find the  user
            const userFound = await User.findById(userId);
            if (!userFound) {
                return res.status(404).json({
                    status: "false",
                    message: "User not found",
                });
            }
            //Get the payment details
            const amount = paymentIntent?.amount / 100;
            const currency = paymentIntent?.currency;
            const paymentId = paymentIntent?.id;

            //create the payment history
            const newPayment = await Payment.create({
                user: userId,
                email: userEmail,
                subscriptionPlan,
                amount,
                currency,
                status: "success",
                reference: paymentId,
            })
            //check for the subscription plan
            if (subscriptionPlan === "Basic") {
                //update the user
                const updatedUser = await User.findByIdAndUpdate(userId, {
                    subscriptionPlan,
                    trialPeriod: 0,
                    nextBillingDate: calculateNextBillingDate(),
                    apiRequestCount: 0,
                    monthlyRequestCount: 50,
                    subscriptionPlan: "Basic",
                    $addToSet: { payments: newPayment?._id },
                });
                res.json({
                    status: "success",
                    message: "Payment verified successfully",
                    user: updatedUser,
                })

            }
            if (subscriptionPlan === "Premium") {
                //update the user
                const updatedUser = await User.findByIdAndUpdate(userId, {
                    subscriptionPlan,
                    trialPeriod: 0,
                    nextBillingDate: calculateNextBillingDate(),
                    apiRequestCount: 0,
                    monthlyRequestCount: 100,
                    subscriptionPlan: "Premium",
                    $addToSet: { payments: newPayment?._id },
                });
                res.json({
                    status: "success",
                    message: "Payment verified successfully",
                    user: updatedUser,
                })

            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
})


//-----handle free subscription-----
const handleFreeSubscription = asyncHandler(async (req, res) => {
    //*get the login user
    const user = req?.user;
    //*check if user account should be renew or not
    try {
        // console.log(user);
        if (Renewsubscription(user)) {
            //*update the user account
            user.subscriptionPlan = "Free";
            user.monthlyRequestCount = 5;
            user.apirequestCount = 0;
            user.nextBillingDate = calculateNextBillingDate();
            // user.trialActive = false;

            //*check new payment and save into DB
            const newPayment = await Payment.create({
                user: user?._id,
                subscriptionPlan: "Free",
                amount: 0,
                status: "success",
                reference: Math.random().toString(36).substring(7),
                monthlyRequestCount: 5,
                currency: "usd",
            });
            // console.log(newPayment);
            user.payments.push(newPayment?._id);
            await user.save();
            //send the response
            res.json({
                status: "success",
                message: "Subscription renewed successfully",
                user,
            })

        }
        else {
            //send the response
            console.log(calculateNextBillingDate());
            return res.status(403).json({ message: "No need to renew subscription" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }

})
module.exports = { verifyPayment, handleStripePayment, handleFreeSubscription }
