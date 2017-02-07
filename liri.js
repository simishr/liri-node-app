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

// grabbing user command from command prompt..
var commands = process.argv[2];

var twitterID = "simishr";
var twitterURL = "https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=" + twitterID + "&count=20";

// function that pulls 20 recent tweets from twitter..
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

// function that pulls info about a song from spotify..
function spotifyThisSong(){

	var songName = process.argv[3];

	if(songName){

		spotify.search({ type: 'track', query: songName }, function(err, data) {

		    if ( err ) {
		        console.log('Error occurred: ' + err);
		        return;
		    }
		 	
		 	console.log("Artists: " + data.tracks.items[0].artists[0].name);
		 	console.log("Song: " + data.tracks.items[0].name);
		 	console.log("Preview: " + data.tracks.items[0].preview_url);
			console.log("Album: " + data.tracks.items[0].album.name);
	    
		});

	} else {

		spotify.search({ type: 'track', query: 'the sign' }, function(err, data) {

		    if ( err ) {
		        console.log('Error occurred: ' + err);
		        return;
		    }

		 	console.log("Artists: " + data.tracks.items[0].artists[0].name);
		 	console.log("Song: " + data.tracks.items[0].name);
		 	console.log("Preview: " + data.tracks.items[0].preview_url);
			console.log("Album: " + data.tracks.items[0].album.name);
		
			});
		};
}

// function that pulls info about movies from IMDB..
function movieThis(){

	var movieName = process.argv[3];

	request('http://www.google.com', function (error, response, body) {
  	if (!error && response.statusCode == 200) {
    console.log("hello"); // OMDB page not working!
  		}
	})
}

// function used to call LIRI's commands.
function doWhatItSays() {

	

}

switch (commands) {
	case "my-tweets" : {
		myTweets();
		break;
	}

	case "spotify-this-song" : {
		spotifyThisSong();
		break;
	}

	case "movie-this" : {
		movieThis();
		break;
	}

	case "do-what-it-says" : {
		doWhatItSays();
		break;
	}

}

