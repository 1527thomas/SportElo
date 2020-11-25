const router = require("express").Router();
const config = require("config");
const axios = require('axios');

const key = config.get("newsapiToken");

//example endpointUrl Need to replace qInTitle to user.followerdPlayers.name
const endpointUrl = 'http://newsapi.org/v2/everything';
                    // 'qInTitle="Stephen Curry"&' +
                    // 'sortBy=publishedAt&' +
                    // 'language=en'
                    // 'apiKey=01b449525a8f4670a1d8a19f52c45f14';


//given a athletename find news article on them
router.get("/", async (req, res) => {
    const athlete = req.query.athletename;
    const result = await axios.get(endpointUrl, {
        params: {
            qInTitle: athlete,
            sortBy: "publishedAt",
            language: "en",
            apiKey: key,
        }
    })
    .catch(err => {
        console.log("result err: " + err)
    })

    if(result.data) {
        const article = result.data.articles[1];
        //sends newest article
        res.send(article);
    }
    else {
        return res
        .status(404)
        .json({ msg: "News Articles not found" });
    }
});

module.exports = router;