const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    twitter: {
        type: String
    },
    sport: {
        type: String
    }
});

module.exports = Player = mongoose.model("player", playerSchema);
