// imports dotenv npm package functionality
require("dotenv").config();
// imports twitter npm package functionality
var Twitter = require("twitter");
// imports node-spotity-api npm package functionality
var Spotify = require('node-spotify-api');
// imports request npm package functionality
var request = require('request');

// imports twitter and spotify environment variables from keys.js file
var keys = require("./keys.js");

// allows us to access Spotify key information
var spotify = new Spotify(keys.spotify);
// allows us to access Twitter key information
var client = new Twitter(keys.twitter);

// grabs and stores what the user command is
var userCommand = process.argv[2];
// stores all of the arguments in an array
var nodeArgs = process.argv;
// create an empty variable for holding the song name
var userInput = "";

// loop through all the words in the user search and add a "+" between multiple arguments
for (var i = 3; i < nodeArgs.length; i++) {
  if (i > 3 && i < nodeArgs.length) {
    userInput = userInput + "+" + nodeArgs[i];
  }
  else if (i = 3) {
    userInput += nodeArgs[i];
  }
}

// this will run a function based off the user argument that was used
switch (userCommand) {
  case "my-tweets":
    tweets();
    break;

  case "spotify-this-song":
    spotifySong();
    break;

  case "movie-this":
    movie();
    break;

  case "do-what-it-says":
    random();
    break;
}

// prints last 20 tweets and the time when they were created to the console
function tweets() {
  var params = { screen_name: 'nodejs', count: 20 };
  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
      for (var i = 0; i < tweets.length; i++) {
        console.log(JSON.stringify(tweets[i].created_at))
        console.log(JSON.stringify(tweets[i].text) + "\n--------------------------\n");
      }
    };
  });
};

function spotifySong() {
  spotify.search({ type: 'track', query: userInput || "The Sign Ace of Base" }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

    // stores the first track object returned
    var trackInfo = data.tracks.items[0];

    // displays the artist of the searched track
    console.log("Artist(s): " + (JSON.stringify(trackInfo.album.artists[0].name)));

    // displays the name of the searched track
    console.log("Song Name: " + (JSON.stringify(trackInfo.name)));

    // displays the preview url of the searched track
    console.log("Preview Song: " + (JSON.stringify(trackInfo.preview_url)));

    // displays the album of the searched track
    console.log("Album: " + (JSON.stringify(trackInfo.album.name)));
  });
};


var movieName = "";

function movie() {

}