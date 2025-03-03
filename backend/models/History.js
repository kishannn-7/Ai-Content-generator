const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    content: {
        type: String,
        required: true
    },
    heading: {
        type: String,
    }
}, {
    timestamps: true,
});

//* Compile to form the model
const History = mongoose.model("History", historySchema); // Update this line
module.exports = History;
