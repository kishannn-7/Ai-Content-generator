const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const History = require("../models/History");



//----Regestration------
const register = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body
    //Validate
    if (!username || !email || !password) {
        res.status(400)
        throw new Error("Please all fields are required")
    }
    //check if email is taken
    const userExits = await User.findOne({ email });
    if (userExits) {
        res.status(400)
        throw new Error("User already exists")
    }
    //Hash the user Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create the user
    const newUser = new User({
        username,
        email,
        password: hashedPassword
    });
    //add the date the trail will end
    newUser.trialExpires = new Date(
        new Date().getTime() + newUser.trialPeriod * 24 * 60 * 60 * 1000
    );

    await newUser.save()
    res.json({
        status: "success",
        message: "Regestration Successful",
        user: {
            username, email
        }
    })

})

//----Login------\
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.status(400)
        throw new Error("Please add email and password")
    }
    //check if user exists
    const user = await User.findOne({ email })
    if (!user) {
        res.status(400)
        throw new Error("Invalid email or Password")
    }
    //check if password is correct
    const passwordIsCorrect = await bcrypt.compare(password, user.password);
    if (!passwordIsCorrect) {
        res.status(400)
        throw new Error("Invalid email or Password")
    }
    //Generate token (jwt)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "3d", //token expires in 3 days
    });
    // console.log(token);
    //set the token into cookie (http only)
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000, //1 day
    });
    //send the response
    res.json({
        status: "success",
        _id: user._id,
        message: "Login Successful",
        user: {
            username: user.username,
            email: user.email
        }
    })
})

//----Logout------
const logout = asyncHandler(async (req, res) => {
    res.cookie("token", "", { maxAge: 1 })
    res.json({ status: "success", message: "Logout Successful" })
})

//----Profile------
const userProfile = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id)
        .select("-password")
        .populate("payments")
        .populate("history");
    if (user) {
        res.status(200);
        res.json({
            status: "success",
            user
        })
    } else {
        res.status(400)
        throw new Error("User not found")
    }
})

//----Delete history------
const deleteHistory = asyncHandler(async (req, res) => {

    //delete id from user history array in user model
    const user = await User.findById(req.user._id);
    const index = user.history.indexOf(req.params.id);
    if (index > -1) {
        user.history.splice(index, 1);
    }
    await user.save();
    delete history
    const deletedHistory = await History.findByIdAndDelete(req.params.id);

    if (deletedHistory) {
        res.status(200);
        res.json({
            status: "success",
            message: "History Deleted",
        })
    } else {
        res.status(400)
        throw new Error("History not found")
    }
})

//----Check user Auth Status------
const checkAuth = asyncHandler(async (req, res) => {
    const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
    if (decoded) {
        res.json({
            isAuthenticated: true,
        });
    } else {
        res.json({
            isAuthenticated: false,
        });
    }
});

//----Update Content------
const updateContent = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;

    // Find the history record
    const historyRecord = await History.findById(id);

    if (!historyRecord) {
        res.status(404);
        throw new Error("History not found");
    }

    // Update the content
    historyRecord.content = content;
    await historyRecord.save();

    res.status(200).json({
        status: "success",
        message: "Content Updated",
        data: historyRecord,
    });
});


module.exports = {
    register,
    login,
    logout,
    userProfile,
    checkAuth,
    deleteHistory,
    updateContent,
}