# twitterTestApp

this app is used for showing 50 latest tweets of a twitter user. It's implemented using [React framework](http://facebook.github.io/react/docs/getting-started.html). It uses [este](https://github.com/este/este) dev stack and starter kit for React universal web apps 

## Fundamental used modules
* [este](https://github.com/este/este) - for app infrastructure
* [react tweet](https://github.com/artnotfound/react-tweet) - react tweet component for visualizing a tweet from Twitter
* [react bootstrap](https://github.com/react-bootstrap/react-bootstrap) - some copmonents (buttons, inputs) are used from this library
* [twit](https://github.com/ttezel/twit) - module for communication with Twitter API in the backend

## Code of the application in este framework
* /twitterTestApp/src/browser/twitter - react component and styles
* /twitterTestApp/src/browser/lib/ajaxHelper.js - ajax get method impl
* /twitterTestApp/src/browser/lib/tweetsHelper.js - Contains helepr function for parsing/sorting tweets JSONs from Twitter API
* /twitterTestApp/src/server/twitter - rest service for gathering tweets from Twitter API

## Installation
 1. clone repository
 2. open folder with clone project in console
 3. type npm install to download dependencies
 4. type gulp to run project
 5. open a web browser and open the application on http://localhost:8000 URL

## Live example of APP on heroku web server
 https://marekvtwittertestapp.herokuapp.com/

## TODO
* Try using redux and Immutablejs libraries to implement data layer (Redux already implemented in different project https://github.com/marekv69/reduxTwitterTestApp)
