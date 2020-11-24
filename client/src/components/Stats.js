import React from "react";
import Axios from "axios";
//import { Stats } from "fs";



function Stats({ name }) {
    var player_stat_id;

    //various html ids
    var pointID = name + "points";
    var rebID = name + "reb";
    var stlID = name + "stl";
    var astID = name + "ast";
    var blkID = name + "blk";

    getId(name).then(res => {

        player_stat_id = res.data[0].id;

        //get first page of player game info
        getStats(player_stat_id, 0).then(res => {
            var page = res.meta.total_pages;

            //gets last page of player game stat info to get latest game stats
            getStats(player_stat_id, page).then(res => {
                var game = res.data.length - 1;
                //various stats from latest game
                var pts = res.data[game].pts;
                var reb = res.data[game].reb;
                var stl = res.data[game].stl;
                var ast = res.data[game].ast;
                var blk = res.data[game].blk;

                document.getElementById(pointID).innerHTML = "Points: " + pts;
                document.getElementById(rebID).innerHTML = "Rebounds: " + reb;
                document.getElementById(stlID).innerHTML = "Steals: " + stl;
                document.getElementById(astID).innerHTML = "Assists: " + ast;
                document.getElementById(blkID).innerHTML = "Blocks: " + blk;
            });
        });
    });


    return (
        <div className="stats_post">
            Latest Game Stats: 
            <p id={pointID} > </p>
            <p id={rebID} > </p>
            <p id={stlID} > </p>
            <p id={astID} > </p>
            <p id={blkID} > </p>
        </div>
    );
}

async function getStats(player_stat_id, page) {
    return await Axios.get(
        "https://www.balldontlie.io/api/v1/stats", {
            params: {
                player_ids: [player_stat_id],
                seasons: [2019],
                page: page
            }
        })
        .then(result => {
            return result.data;
        });
}

async function getId(name) {
    return await Axios.get(
        "https://www.balldontlie.io/api/v1/players", {
            params: {
                search: name
            }
        })
        .then(result => {
            return result.data;
        });
}
export default Stats;