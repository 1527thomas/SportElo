const router = require("express").Router();
const config = require("config");

const needle = require("needle");

const token = config.get("twitterBearerToken");

const endpointUrl = "https://api.twitter.com/2/tweets/search/recent";

router.get("/", async (req, res) => {
  const twitterHandle = req.query.username;
  const params = {
    query: "from:" + twitterHandle,
    "tweet.fields": "author_id",
  };

  const result = await needle("get", endpointUrl, params, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (result.body) {
    if (result.body.data == null) {
      return res.json({ msg: "No recent tweets" });
    }
    for (var i = 0; i < result.body.data.length; i++) {
      var tweet = result.body.data[i];

      if (tweet.id == result.body.meta.newest_id) {
        res.send(tweet);
      }
    }
  } else {
    return res.status(404).json({ msg: "Tweets not found" });
  }
});

module.exports = router;
