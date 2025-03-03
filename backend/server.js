const express = require("express");
const userRouter = require("./routes/userRouter");
const connectDB = require("./utils/connectDB");
const errorHandler = require("./middlewares/errorMiddleware");
const cookieParser = require("cookie-parser");
const openAIRouter = require("./routes/openAIRouter");
const stripeRouter = require("./routes/stripeRouter");
const cron = require("node-cron");
const User = require("./models/User");
const cors = require("cors")
const app = express();
const PORT = process.env.PORT || 8090;
require("dotenv").config();

connectDB();
//1second   sec  min  hour  day  month  week(0-6)0-sunday
// cron.schedule("* * * * * *", async () => {
//     console.log("This task runs every second");
// })


//Cron for the trial period : run every single
//? 1second   sec  min  hour  day  month  week(0-6)0-sunday
cron.schedule("0 0 * * * *", async () => {
    // console.log("This task runs every second");
    try {
        //get the current date
        const today = new Date();
        const updatedUser = await User.updateMany({
            trialActive: true,
            trialExpires: { $lt: today },
        }, {
            trialActive: false,
            subscriptionPlan: "Free",
            monthlyRequestCount: 50,
            // nextBillingDate: calculateNextBillingDate(),
        })
    } catch (error) {
        console.log(error);
    }
})

//cron for free subscription plan: run every single month 
cron.schedule("0 0 1 * * *", async () => {
    try {
        //get the current date
        const today = new Date();
        const updatedUser = await User.updateMany({
            subscriptionPlan: "Free",
            nextBillingDate: { $lt: today },
        }, {
            monthlyRequestCount: 0,
            // nextBillingDate: calculateNextBillingDate(),
        })
    } catch (error) {
        console.log(error);
    }
})

//cron for Basic subscription plan: run every single month 
cron.schedule("0 0 1 * * *", async () => {
    try {
        //get the current date
        const today = new Date();
        const updatedUser = await User.updateMany({
            subscriptionPlan: "Basic",
            nextBillingDate: { $lt: today },
        }, {
            monthlyRequestCount: 0,
            // nextBillingDate: calculateNextBillingDate(),
        })
    } catch (error) {
        console.log(error);
    }
})

//cron for Premium subscription plan: run every single month 
cron.schedule("0 0 1 * * *", async () => {
    try {
        //get the current date
        const today = new Date();
        const updatedUser = await User.updateMany({
            subscriptionPlan: "Premium",
            nextBillingDate: { $lt: today },
        }, {
            monthlyRequestCount: 0,
            // nextBillingDate: calculateNextBillingDate(),
        })
    } catch (error) {
        console.log(error);
    }
})

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser());//to parse cookies
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions))
//!Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/openai", openAIRouter);
app.use("/api/v1/stripe", stripeRouter);
//!Error Middleware
app.use(errorHandler);

//Start the server  
app.listen(PORT, console.log(`Server is running on port ${PORT}`))


