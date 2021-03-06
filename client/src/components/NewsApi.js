import React, { useState } from "react";
import Axios from "axios";
import "./NewsApi.css";

function NewsApi({ athletename }) {
  const [athleteNewsImage, setAthleteNewsImage] = useState("");
  const [athleteNewsTitle, setAthleteNewsTitle] = useState("");
  const [athleteNewsUrl, setAthleteNewsUrl] = useState("");

  getNews(athletename)
    .then((res) => {
      setAthleteNewsImage(res.urlToImage);
      setAthleteNewsTitle(res.title);
      setAthleteNewsUrl(res.url);
    })
    .catch((err) => {
      console.error("GetNews: " + err);
    });

  return (
    <div className="newsapi__post">
      <div className="newsapi__post__title">{athleteNewsTitle}</div>
      <div className="newsapi__post__image">
        <img src={athleteNewsImage} alt="Athlete News Pic"></img>
      </div>
      <div className="newsapi__post__url">
        <a href={athleteNewsUrl}>Check Out the Article Here</a>
      </div>
    </div>
  );
}

async function getNews(athletename) {
  try {
    return await Axios.get("http://localhost:5000/newsapi", {
      params: {
        athletename: athletename,
      },
    })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log("Get to 5000/newsapi:" + err);
      });
  } catch (err) {
    console.log("GetNews method error: " + err);
  }
}
export default NewsApi;
