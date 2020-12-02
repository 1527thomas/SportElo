const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");
const User = require("../models/userModel");

const jwtSecret = config.get("jwtSecret");

router.post("/register", async (req, res) => {
  try {
    let { email, password, passwordCheck, displayName } = req.body;

    if (!email || !password || !passwordCheck) {
      return res.status(400).json({ msg: "Not all fields have been entered." });
    }
    if (password.length < 5) {
      return res
        .status(400)
        .json({ msg: "The password needs to be at least 5 characters long." });
    }
    if (password !== passwordCheck) {
      return res
        .status(400)
        .json({ msg: "Enter the same password twice for verification." });
    }

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "An account with this email already exists." });
    }

    if (!displayName) {
      displayName = email;
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: passwordHash,
      displayName,
    });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Not all fields have been entered." });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ valid: false, msg: "Invalid credentials." });
    } else {
      const token = jwt.sign({ id: user._id }, jwtSecret);
      res.json({
        token,
        user: {
          id: user._id,
          displayName: user.displayName,
        },
        valid: true,
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/delete", auth, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      console.log(token);
      return res.json(false);
    }

    const verified = jwt.verify(token, jwtSecret);
    if (!verified) {
      return res.json(false);
    }

    const user = await User.findById(verified.id);
    if (!user) {
      return res.json(false);
    }

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/password", async (req, res) => {
  const { userId, password } = req.body;
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  const user = await User.findById(userId);

  if (user) {
    await User.updateOne(
      { _id: userId },
      { $set: { password: passwordHash } },
      { safe: true }
    );
    return res.json(true);
  }
  return res.json(false);
});

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user);
    res.json({
      email: user.email,
      displayName: user.displayName,
      id: user._id,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/addPlayer", async (req, res) => {
  try {
    const userId = req.body.params.userId;
    const player = req.body.params.player;
    const user = await User.findById(userId);

    if (user.players === undefined || user.players.length == 0) {
      await User.findOneAndUpdate(
        { _id: userId },
        { $addToSet: { players: player } }
      );
      return res.json(true);
    } else {
      for (var i = 0; i < user.players.length; i++) {
        if (user.players[i].name === player.name) {
          return res.json(false);
        } else {
          await User.findOneAndUpdate(
            { _id: userId },
            { $addToSet: { players: player } }
          );
          return res.json(true);
        }
      }
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/getPlayers", async (req, res) => {
  try {
    const userId = req.query.userId;
    const userPlayers = await User.findById(userId);
    return res.send(userPlayers.players);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/deletePlayer", async (req, res) => {
  try {
    const userId = req.query.userId;
    const playerId = req.query.playerId;

    const user = await User.findById(userId);

    for (var i = 0; i < user.players.length; i++) {
      if (user.players[i]._id == playerId) {
        console.log("found");
        await User.updateOne(
          { _id: userId },
          { $pull: { players: { _id: playerId } } },
          { safe: true }
        );
        return res.json(true);
      }
    }

    return res.json(false);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
