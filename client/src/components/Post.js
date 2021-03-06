import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./Post.css";
import Stats from "./Stats";
import NewsApi from "./NewsApi";

import { useHistory } from "react-router-dom";

import Tweet from "./Tweet";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

import Avatar from "@material-ui/core/Avatar";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

function Posts({ athletename, athletepicture, playerId, userId }) {
  const history = useHistory();

  const handleDeletePlayer = async (event) => {
    event.preventDefault();
    deletePlayer(userId, playerId)
      .then((res) => {
        console.log(res);
        if (res) {
          alert("Player Removed!");
          history.go(0);
        } else {
          alert("Player already deleted, or incorrect playerId");
        }
      })
      .catch((err) => {
        console.log("deletePlayer error: " + err);
      });
  };

  var Scroll = require("react-scroll");
  var Element = Scroll.Element;
  var backImage =
    "https://raw.githubusercontent.com/kimcoder/react-simple-image-slider/master/src/images/arrow-left-2.png";
  const nextArrow =
    "https://raw.githubusercontent.com/kimcoder/react-simple-image-slider/master/src/images/arrow-right-2.png";

  const [twitterHandle, setTwitterHandle] = useState(null);
  useEffect(() => {
    getTwitterHandle(athletename).then((twitterRes) => {
      setTwitterHandle(twitterRes);
    });
  });

  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt="StephCurry"
          src={athletepicture}
        />
        <h3>{athletename}</h3>
      </div>
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={100}
        totalSlides={3}
      >
        <Slider>
          <Slide index={0}>
            <Stats name={athletename} />
          </Slide>
          <Slide index={1}>
            <div className="post__tweet">
              <Element
                name="test7"
                className="element"
                id="containerElement"
                style={{
                  position: "relative",

                  height: "450px",
                  overflow: "auto",
                }}
              >
                <Tweet handle={twitterHandle} />
              </Element>
            </div>
          </Slide>
          <Slide index={2}>
            <div className="post__newsapi">
              <Element
                name="test7"
                className="element"
                id="containerElement"
                style={{
                  position: "relative",

                  height: "450px",
                  overflow: "scroll",
                }}
              >
                <NewsApi athletename={athletename} />
              </Element>
            </div>
          </Slide>
        </Slider>
        <ButtonBack className="post__back-button">
          <img className="post__arrow" src={backImage} alt="" />
        </ButtonBack>
        <ButtonNext className="post__next-button">
          <img className="post__arrow" src={nextArrow} alt="" />
        </ButtonNext>
      </CarouselProvider>
      <div className="post__delete">
        <IconButton size="small" onClick={handleDeletePlayer}>
          <DeleteIcon fontSize="large" />
        </IconButton>
      </div>

      <div className="post__delete"></div>
    </div>
  );
}

async function getTwitterHandle(name) {
  const dbPlayers = "http://localhost:5000/players/twitterHandle";
  try {
    return await Axios.get(dbPlayers, {
      params: {
        name: name,
      },
    }).then((res) => {
      return res.data;
    });
  } catch (err) {
    console.log("Get athletes twitter method error: " + err);
  }
}

async function deletePlayer(userId, playerId) {
  const db = "http://localhost:5000/users/deletePlayer";
  try {
    console.log(userId, playerId);
    return await Axios.delete(db, {
      params: {
        userId: userId,
        playerId: playerId,
      },
    }).then((res) => {
      return res.data;
    });
  } catch (err) {
    console.log("Delete athlete method error: " + err);
  }
}

export default Posts;
