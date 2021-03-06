import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./Stats.css";

function Stats({ name }) {
  const [stats, setStats] = useState([0, 0, 0, 0, 0]);

  var pointID = name + "points";
  var rebID = name + "reb";
  var stlID = name + "stl";
  var astID = name + "ast";
  var blkID = name + "blk";
  var statHeaderID = name + "header";

  useEffect(() => {
    getId(name).then((res) => {
      var player_stat_id = res.data[0].id;

      getStats(player_stat_id, 0).then((res) => {
        var page = res.meta.total_pages;

        getStats(player_stat_id, page).then((res) => {
          if (res.data === "undefined") {
            setStats([0, 0, 0, 0, 0]);
            return;
          }
          var game = res.data.length - 1;
          if (game < 0) {
            setStats([0, 0, 0, 0, 0]);
            return;
          }

          var date = res.data[game].game.date;

          var year = parseInt(date.substring(0, 4));
          var month = parseInt(date.substring(5, 7));
          var day = parseInt(date.substring(8, 10));

          var newGame = 0;
          var i;
          for (i = 0; i < game; i++) {
            var date1 = res.data[i].game.date;

            var year1 = parseInt(date1.substring(0, 4));
            var month1 = parseInt(date1.substring(5, 7));
            var day1 = parseInt(date1.substring(8, 10));

            if (year1 > year) {
              year = year1;
              month = month1;
              day = day1;
              newGame = i;
            } else if (year === year1 && month1 > month) {
              year = year1;
              month = month1;
              day = day1;
              newGame = i;
            } else if (year === year1 && month1 === month && day1 >= day) {
              year = year1;
              month = month1;
              day = day1;
              newGame = i;
            }
          }
          game = newGame;

          var pts = res.data[game].pts;
          var reb = res.data[game].reb;
          var stl = res.data[game].stl;
          var ast = res.data[game].ast;
          var blk = res.data[game].blk;

          setStats([pts, reb, stl, ast, blk]);
        });
      });
    });
  }, [name]);

  return (
    <div className="stats_post">
      <div id={statHeaderID} className="stats_header">
        {" "}
        Latest Game Stats{" "}
      </div>
      <ul className="stats_list">
        <li className="stats_label">
          {" "}
          Pts
          <p id={pointID} className="stats_line">
            {" "}
            {stats[0]}{" "}
          </p>
        </li>
        <li className="stats_label">
          {" "}
          Reb
          <p id={rebID} className="stats_line">
            {" "}
            {stats[1]}{" "}
          </p>
        </li>
        <li className="stats_label">
          {" "}
          Stl
          <p id={stlID} className="stats_line">
            {" "}
            {stats[2]}{" "}
          </p>
        </li>
        <li className="stats_label">
          {" "}
          Ast
          <p id={astID} className="stats_line">
            {" "}
            {stats[3]}{" "}
          </p>
        </li>
        <li className="stats_label">
          {" "}
          Blk
          <p id={blkID} className="stats_line">
            {" "}
            {stats[4]}{" "}
          </p>
        </li>
      </ul>
    </div>
  );
}

async function getStats(player_stat_id, page) {
  return await Axios.get("https://www.balldontlie.io/api/v1/stats", {
    params: {
      player_ids: [player_stat_id],
      seasons: [2019],
      page: page,
    },
  }).then((result) => {
    return result.data;
  });
}

async function getId(name) {
  return await Axios.get("https://www.balldontlie.io/api/v1/players", {
    params: {
      search: name,
    },
  }).then((result) => {
    return result.data;
  });
}
export default Stats;
