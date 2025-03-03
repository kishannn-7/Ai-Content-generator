const express = require("express");
const userRouter = express.Router();
const { register, login, logout, userProfile, checkAuth, deleteHistory, updateContent, } = require("../controllers/userController");
const isAuth = require("../middlewares/isAuth");

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.get("/profile", isAuth, userProfile);
userRouter.delete("/deletehistory/:id", isAuth, deleteHistory);
userRouter.put("/updatecontent/:id", isAuth, updateContent);
userRouter.get("/auth/check", isAuth, checkAuth);


module.exports = userRouter