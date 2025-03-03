const express = require("express");
const openAIRouter = express.Router();
const isAuth = require("../middlewares/isAuth");
const checkAPiRequestLimit = require("../middlewares/checkApiRequestLimit");
googleAIController = require("../controllers/googleAIController");


openAIRouter.post("/generate-content", isAuth, checkAPiRequestLimit, googleAIController);


module.exports = openAIRouter