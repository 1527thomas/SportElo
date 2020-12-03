const router = require("express").Router();
// const config = require("config");
require("dotenv").config();
const axios = require("axios");

// const key = config.get("newsapiToken");
const key = process.env.newsapiToken;

const endpointUrl = "http://newsapi.org/v2/everything";

router.get("/", async (req, res) => {
  const athlete = req.query.athletename;
  const result = await axios
    .get(endpointUrl, {
      params: {
        qInTitle: athlete,
        sortBy: "publishedAt",
        language: "en",
        apiKey: key,
      },
    })
    .catch((err) => {
      console.log("result err: " + err);
    });

  if (result.data) {
    const article = result.data.articles[1];
    res.send(article);
  } else {
    return res.status(404).json({ msg: "News Articles not found" });
  }
});

module.exports = router;
