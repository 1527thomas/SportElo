const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("config");
const path = require("path");

// set up express
const app = express();
app.use(express.json());
app.use(cors());

// set up routes
app.use("/users", require("./routes/userRouter"));
app.use("/twitter", require("./routes/twitterRouter"));
app.use("/newsapi", require("./routes/newsapiRouter"));
app.use("/players", require("./routes/playersRouter"));

const port = process.env.PORT || 5000;

// Serve static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server has started on port: ${port}`);
});

// set up mongoose
const db = config.get("mongodbURI");

mongoose.connect(
  db,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) throw err;
    console.log("MongoDB connection established");
  }
);
