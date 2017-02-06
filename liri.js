// NPM packages
var fs = require("fs");
var request = require("request");
var spotify = require("spotify");
var twitter = require("twitter");

// grabbing twitter auth keys from keys.js
var keys = require("./keys.js");

var twitterKeys = keys.twitterKeys;

var client = new twitter({

  consumer_key: twitterKeys.consumer_key,
  consumer_secret: twitterKeys.consumer_secret,
  access_token_key: twitterKeys.access_token_key,
  access_token_secret: twitterKeys.access_token_secret

});

// grabbing user command from command prompt
var commands = process.argv[2];

var twitterID = "simishr";
var twitterURL = "https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=" + twitterID + "&count=20";

function myTweets(){
	client.get( twitterURL, function(error, tweet, response) {
	  if(!error) {
	  	for(let i = 0; i < tweet.length; i++) {
	  		console.log("Tweet: " + tweet[i].text);
	  		console.log("Tweeted At: " + tweet[i].created_at);
	  		} 
		};
	});
}
function spotifyThisSong(){};



switch (commands) {
	case "my-tweets" : {
		myTweets();
		break;

	}

	case "spotify-this-song" : {
		
	}

	case "movie-this" : {
		
	}

	case "do-what-it-says" : {
		
	}

}

