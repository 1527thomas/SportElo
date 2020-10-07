const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("config");

// set up express
const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;

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
  },
  (err) => {
    if (err) throw err;
    console.log("MongoDB connection established");
  }
);

// set up routes
app.use("/users", require("./routes/userRouter"));
