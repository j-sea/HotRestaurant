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

var waitingList = [
    {
    routeName: "john",
    name: "John",
    number: "411",
    email: "johndoe@email.com",
    id: "1234567890"
  }
]

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/table", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/api/reservations", function(req, res) {
    return res.json(reservations);    
  });
  
  app.get("/api/waitingList", function(req, res) {
    return res.json(waitingList);    
  });


  app.get("/api/reservations/:reservation", function(req, res) {
    var chosen = req.params.reservation;
  
    console.log(chosen);
  
    for (var i = 0; i < reservations.length; i++) {
      if (chosen === reservations[i].routeName) {
        return res.json(reservations[i]);
      }
    }
  
    return res.json(false);
  });

app.post("/api/reservations", function(req, res) {
  if (reservations.length < 5) {

    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newReservation = req.body;
    console.log(newReservation);
    newReservation.routeName = newReservation.name
      .replace(/\s+/g, "")
      .toLowerCase();
  
    console.log(newReservation);
  
    reservations.push(newReservation);
  
    res.json(newReservation);
  }
  else {

    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newWaitingList = req.body;
  
    newWaitingList.routeName = newWaitingList.name
      .replace(/\s+/g, "")
      .toLowerCase();
  
    console.log(newWaitingList);
  
    waitingList.push(newWaitingList);
  
    res.json(newWaitingList);
  }
});

app.post("/api/waitingList", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newWaitingList = req.body;
  
    newWaitingList.routeName = newWaitingList.name
      .replace(/\s+/g, "")
      .toLowerCase();
  
    console.log(newWaitingList);
  
    waitingList.push(newWaitingList);
  
    res.json(newWaitingList);
  });
  
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });