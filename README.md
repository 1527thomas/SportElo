## SportElo
CMPE 195 Senior Project: SportElo
SportElo is a web application which allows users to follow their favorite basketball players from our database (more players and sports coming soon!) 
It leverages API's in order to fetch an athlete's latest stat's, twitter post, and news article.

## Motivation
SportElo was started as we saw complications with switching between different applications and google. We wanted to create a platform which could hold
this data and reduce the time spent switching between these other platforms, thus SportElo was created.

## Tech/framework used
<b>Built with</b>
- [Create React App](https://create-react-app.dev/)
- [MongoDB](https://www.mongodb.com/)
- [Express.js](https://expressjs.com/)
- [Axios](https://www.npmjs.com/package/axios) <br />
<b>APIs Leveraged</b>
- [TwitterAPI](https://developer.twitter.com/en/docs/twitter-api)
- [BallDontLie.io](https://www.balldontlie.io/#introduction)
- [NewsAPI](https://newsapi.org/)

## Features
- [x] User Dashboard with latest posts
- [x] Search Page with players from database
- [ ] Profile Page
- [ ] Other Sports

## Installation

```
$ git clone https://github.com/1527thomas/SportElo.git
```
cd into SportElo and install dependencies for server
```
$ npm install
```
Install dependencies for client
```
$ npm run client-install
```

## How to use?
Before running this application, check to make sure you have API keys for in order to fetch the data needed for each API.
We have provided ours within the config/default.json to provide a local testing environment.
Along with this, you may also want to configure the jwtSecret value to be unique to your environment.

From the SportElo folder. This will create the server and client for development purposes.
```
$ npm run dev
```

## Credits
Created by
Thomas Wang
Keanu Paesler
Kevin Ma
Welby Chan
