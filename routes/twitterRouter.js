const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");
const User = require("../models/userModel");

const jwtSecret = config.get("jwtSecret");

const needle = require('needle');

const token = config.get("twitterBearerToken");

const endpointUrl = 'https://api.twitter.com/2/tweets/search/recent';


//given a twitter handle find the most recent tweet
router.get("/", async (req, res) => {
    const twitterHandle = req.query.username;
    const params = {
        'query': 'from:' + twitterHandle,
        'tweet.fields': 'author_id'
    }

    const result = await needle('get', endpointUrl, params, {
        headers: {
            "authorization": `Bearer ${token}`
        }
    })

    if (result.body) {

        //find the most newest tweet from recent tweets
        for (var i = 0; i < result.body.data.length; i++) {
            var tweet = result.body.data[i];

            if (tweet.id == result.body.meta.newest_id) {
                //console.log(tweet.id);
                res.send(tweet);
            }
        }
        //res.send(result.body);
    } else {
        return res
            .status(404)
            .json({ msg: "Tweets not found" });
    }
    //console.log(result.body);
});

module.exports = router;