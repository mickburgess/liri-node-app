// imports dotenv npm package functionality
require("dotenv").config();
// imports twitter npm package functionality
var Twitter = require("twitter");
// imports node-spotity-api npm package functionality
var Spotify = require("node-spotify-api");
// imports request npm package functionality
var request = require("request");
// imports file system for reading files
var fs = require("fs");

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
// create an empty variable for holding the user's search
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
        console.log("Date Created: " + JSON.stringify(tweets[i].created_at))
        console.log("Tweet: " + JSON.stringify(tweets[i].text) + "\n--------------------------\n");
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


function movie() {
  // Then run a request to the OMDB API with the movie specified
  var queryUrl = "http://www.omdbapi.com/?t=" + (userInput || "Mr. Nobody") + "&y=&plot=short&apikey=trilogy";

  request(queryUrl, function (error, response, body) {

    if (!error && response.statusCode === 200) {
      // gets movie title from body
      console.log("Movie Title: " + JSON.parse(body).Title);
      // gets release year from body
      console.log("Release Year: " + JSON.parse(body).Year);
      // gets IMDB rating of movie from body
      console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
      // gets Rotten Tomatoes rating of movie from body
      console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
      // gets country the movie was produced from body
      console.log("Country Where Produced: " + JSON.parse(body).Country);
      // gets language of the movie from body
      console.log("Language: " + JSON.parse(body).Language);
      // gets plot of the movie from body
      console.log("Plot: " + JSON.parse(body).Plot);
      // gets actors in the movie from body
      console.log("Actors: " + JSON.parse(body).Actors);
    }
  })
};

function random() {
  // reads from the random.txt file and stores the value in data array
  fs.readFile("./random.txt", "utf8", function(error, data) {

    if (error) {
      return console.log(error);
    }
    // splits the array of values on the comma and stores in a variable
    var output = data.split(",");

    // stores first part as the user command
    userCommand = output[0];
    // stores second part as the user's value input
    userInput = output[1];
    // calls a function based off what user command was in the random.txt file
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
    }
  })
}