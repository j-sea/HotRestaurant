var express = require("express");
var path = require("path");

var app = express();
var PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//============================================================\\

var reservations = [
  {
    routeName: "john",
    name: "John",
    number: "411",
    email: "johndoe@email.com",
    id: "1234567890"
  }
];

var waitingList;

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/table", function(req, res) {
  res.sendFile(path.join(__dirname, "add.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "add.html"));
});

app.get("/api/reservations", function(req, res) {
    return res.json(reservations);    
  });

app.post("/api/reservations", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newReservation = req.body;

  newReservation.routeName = newReservation.name
    .replace(/\s+/g, "")
    .toLowerCase();

  console.log(newReservation);

  characters.push(newReservation);

  res.json(newReservation);
});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });