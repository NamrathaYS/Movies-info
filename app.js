const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
});

app.post("/", function(req, res) {
  const title = req.body.movie_name;
  const type = req.body.type;
  const plot = req.body.plot;
  const apiKey = "bdfae19e";

  const url = encodeURI("http://www.omdbapi.com/?t=" + title + "&type=" + type + "&plot=" + plot + "&apikey=" + apiKey);
  // console.log(url);

  http.get(url,function(response){
    // console.log("Status code : " + response.statusCode);
    response.on("data",function(data){
      const moviesData = JSON.parse(data);
      // console.log(moviesData);
      const imdbRating = moviesData.Ratings[0].Value;
      // console.log(imdbRating);
      res.send("The imdb rating of your search is " + imdbRating +" .");
    });
  });
});

app.listen(3000, function() {
  console.log("Starting server at port: 3000");
});
