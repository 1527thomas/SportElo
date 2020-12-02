const mongoose = require("mongoose");
const playerModel = require("./playerModel");
const Player = require("./playerModel");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  displayName: {
    type: String,
  },
  players: [Player.schema],
});

module.exports = User = mongoose.model("user", userSchema);
