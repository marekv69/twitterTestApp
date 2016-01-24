import express from 'express';
import Twit from 'twit';

const app = express();

const config = {
  "consumer_key": "Vavpkk33OIb9vkeDKCxUs7NWX",
  "consumer_secret": "MhH3ci2Oau6ISQFVz9myClqQnMHm6i9A7krJ7uEEwi7wQpfmFw",
  "app_only_auth" :  true
};

app.get("/user_timeline",function (req, res)  {
  var twit = new Twit(config);
  twit.get('statuses/user_timeline', { screen_name: req.query.screen_name, count: 50 }, (err, data) => {
    let response;

    if(typeof err !== "undefined") {
      response = {
          errorMessage : "There were communication error with Twitter API when trying to gather tweets for user "+
          req.query.screen_name + ". Error message: " + err.message + " Error code: " + err.code
        };
    } else {
      if(Array.isArray(data) && data.length > 0) {
        response = {
          tweets: data
        };
      }
      else {
        response = {
          standardMessage : "There are no tweets for user " + req.query.screen_name + " available."
        };
      }
    }

    res.send(response);
  });
});

export default app;
