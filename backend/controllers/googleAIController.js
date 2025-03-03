require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const AsyncHandler = require("express-async-handler");
const User = require("../models/User");
const History = require("../models/History");

const genAI = new GoogleGenerativeAI(process.env.GOOGLEAI_API_KEY);


const googleAIcontroller = AsyncHandler(async (req, res) => {
    const { prompt, heading } = req.body;

    // Choose a model that's appropriate for your use case.
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: { maxOutputTokens: 600, temperature: 0.9 },
    });
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    const toPascalCase = str => (str.match(/[a-zA-Z0-9]+/g) || []).map(w => `${w.charAt(0).toUpperCase()}${w.slice(1)}`)
    const headingPascalCase = toPascalCase(heading).join(' ');
    //Create the history
    const newContent = await History.create({
        user: req.user._id, content: text, heading: headingPascalCase
    });

    //Push the content into the history
    const userFound = await User.findById(req.user.id);
    userFound.history.push(newContent._id);

    //Update the API request count
    userFound.apirequestCount += 1;
    await userFound.save();
    res.status(200).json(text)
});

module.exports = googleAIcontroller;
