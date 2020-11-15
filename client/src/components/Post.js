import React from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";

import Tweet from "./Tweet";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

import Axios from "axios";


function Posts({ athletename, imageUrl }) {
    var Scroll = require('react-scroll');
    var Element = Scroll.Element;
    //arrow images
    var backImage =
        "https://raw.githubusercontent.com/kimcoder/react-simple-image-slider/master/src/images/arrow-left-2.png";
    const nextArrow =
        "https://raw.githubusercontent.com/kimcoder/react-simple-image-slider/master/src/images/arrow-right-2.png";


    //get atheltes handles/info based on name from player database in future
    var twitterHandle = "KingJames";
    var profilePic =
        "https://image-cdn.essentiallysports.com/wp-content/uploads/20200702112824/lebron-james-flexing-1600x901.jpg";
    if (athletename === "Stephen Curry") {
        //twitterHandle = "StephenCurry30";
        //used james harden cuz steph curry hasnt tweeted recently
        twitterHandle = "JHarden13";
        profilePic =
            "https://image-cdn.essentiallysports.com/wp-content/uploads/20200725130552/stephen-curry-gsw-2-scaled.jpg";

    }

  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt="StephCurry"
          src={profilePic}
        />
        <h3>{athletename}</h3>
      </div>
          {/* header -> avatar + athletename */}
            
          <CarouselProvider
              naturalSlideWidth={100}
              naturalSlideHeight={100}
              totalSlides={3}
          >
              <Slider>
                  <Slide index={0}>
                      <img className="post__image" src={imageUrl} alt="" />
                  </Slide>
                  <Slide index={1}>
                      <div className="post__tweet">
                          <Element name="test7" className="element" id="containerElement" style={{
                              position: 'relative',
                              height: '450px',
                              overflow: 'scroll'
                          }}>
                              <Tweet handle={twitterHandle} />
                          </Element>
                      </div>
                  </Slide>
                  <Slide index={2}>I am the third Slide. Instagram?</Slide>
              </Slider>
              <ButtonBack className="post__back-button" >
                  <img className="post__arrow" src={backImage} alt="" />
              </ButtonBack>
              <ButtonNext className="post__next-button" >
                  <img className="post__arrow" src={nextArrow} alt="" />
              </ButtonNext>
          </CarouselProvider>
      {/* image(s) */}
    </div>
  );
}
export default Posts;
