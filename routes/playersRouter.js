const router = require("express").Router();
const Player = require("../models/playerModel");

router.get("/", async (req, res) => {
  const players = await Player.find();
  if (!players) {
    return res.status(400).json({ msg: "No player found." });
  } else {
    res.send(players);
  }
});

router.get("/twitterHandle", async (req, res) => {
  try {
    const athleteName = req.query.name;

    const athlete = await Player.findOne({ name: athleteName });
    return res.send(athlete.twitter);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/add", async (req, res) => {
  const player = await Player.find();
  if (!player) {
    return res.status(400).json({ msg: "No player found." });
  } else {
    console.log(player);
  }
});

module.exports = router;
