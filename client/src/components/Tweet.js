import React from "react";
import Axios from "axios";



function Tweet({ handle }) {
    // console.log(handle);
    getTweet(handle).then(res => {
        var TwitterWidgetsLoader = require('twitter-widgets');

        TwitterWidgetsLoader.load(function (err, twttr) {
            if (err) {
                //do some graceful degradation / fallback
                return;
            }

            //checks if container is filled, if not create tweet
            if (document.getElementById(handle).innerHTML === "")
                twttr.widgets.createTweet(res, document.getElementById(handle));
        });
    });


    return (
        <div className="tweet_post">
            <div id={handle} ></div>
        </div>
    );
}

async function getTweet(handle) {
    return await Axios.get(
        "http://localhost:5000/twitter", {
            params: {
                username: handle
            }
        })
        .then(result => {
            return result.data.id;
        });


}
export default Tweet;