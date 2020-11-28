const router = require("express").Router();
const Player = require("../models/playerModel");

//returns collection of players
router.get("/", async (req, res) => {
    const players = await Player.find();
    if (!players) {
        return res
          .status(400)
          .json({ msg: "No player found." });
      }
    else {
        res.send(players);
    }
});

//add's static data to DB?
router.post("/add", async (req, res) => {
    const player = await Player.find();
    if (!player) {
        return res
          .status(400)
          .json({ msg: "No player found." });
      }
      else {
          console.log(player);
      }
})

module.exports = router;