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
// grabs and stores what the user search value is
var userSearch = process.argv;
// create an empty variable for holding the song name
var songName = "";

// loop through all the words in the user search and add a "+" between multiple arguments
for (var i = 3; i < userSearch.length; i++) {
  if (i > 3 && i < userSearch.length) {
    songName = songName + "+" + userSearch[i];
  }
  else if (i = 3) {
    songName += userSearch[i];
  }
  else if (userSearch[i] = undefined) {
    songName = "The Sign";
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

// function that searches Spotify for the track the user inputs
function spotifySong() {
  spotify.search({ type: 'track', query: songName || "The Sign Ace of Base" }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
  // stores the first track object returned
  // var trackInfo = data.tracks.items[i];
  for(var i = 0; i < data.tracks.items.length; i++) {
  
  // displays the artist of the searched track
  console.log("Artist(s): " + (JSON.stringify(data.tracks.items[i].album.artists[0].name)));
  
  // displays the name of the searched track
  console.log("Song Name: " + (JSON.stringify(data.tracks.items[i].name)));
  
  // displays the preview url of the searched track
  console.log("Preview Song: " + (JSON.stringify(data.tracks.items[i].preview_url)));
  
  // displays the album of the searched track
  console.log("Album: " + (JSON.stringify(data.tracks.items[i].album.name)) + "\n--------------------------\n");
  }
  });
};