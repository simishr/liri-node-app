// NPM packages
var fs = require("fs");
var Twitter = require("twitter");
var spotify = require("spotify");
var request = require("request");


// grabbing twitter auth keys from keys.js
var keys = require("./keys.js");

var twitterKeys = keys.twitterKeys;

var client = new Twitter({

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

		    if (err) {
		        console.log('Error occurred: ' + err);
		        return;

		    } 

		 	function displayInfo() {
				console.log("Artists: " + data.tracks.items[0].artists[0].name);
			 	console.log("Song: " + data.tracks.items[0].name);
			 	console.log("Preview: " + data.tracks.items[0].preview_url);
				console.log("Album: " + data.tracks.items[0].album.name);
			}

		 	displayInfo();
	    
		});

	} else {

		spotify.search({ type: 'track', query: 'the sign' }, function(err, data) {

		    if (err) {
		        console.log('Error occurred: ' + err);
		        return;
		    }

		 	displayInfo();
		
			});
		};
}

// function that pulls info about movies from IMDB..
function movieThis(){

	var movieName = process.argv[3];
	var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json";

	request(queryUrl, function(error, response, body) {
 	
  	// If the request is successful
  	console.log("Title: " + JSON.parse(body).Title);
  	console.log("Release year: " + JSON.parse(body).Year);
  	console.log("Rating: " + JSON.parse(body).imdbRating);
    console.log("Country Produced in: " + JSON.parse(body).Country);
    console.log("Language: " + JSON.parse(body).Language);
    console.log("Plot: " + JSON.parse(body).Plot);
    console.log("Actors: " + JSON.parse(body).Actors);
    // console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Language);
    // console.log("Rotten Tomatoes Url: " + JSON.parse(body).Language);


  
});
	//request('http://www.google.com', function (error, response, body) {
  	//if (!error && response.statusCode == 200) {
    
  	//	}
	//})
}

fs.appendFile("log.txt", "\n" + process.argv.slice(2), function(err){

	if(err) throw err;

	
});

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

		fs.readFile("random.txt", "utf8", function(error, data){

			if(error) throw error;
			
			var data = data.split(",");

			if(data[0] === "my-tweets"){
				myTweets();	

			} else if(data[0] === "spotify-this-song"){
				spotifyThisSong(data[1]);
				
			} else if(data[0] === "movie-this") {
				movieThis(data[1]);
			}
				
	});
		break;
	}

}

