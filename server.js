var express = require("express");
var path = require("path");

var app = express();
var PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//============================================================\\

var reservations = [
    {
    name:"John",
    number: "411",
    email:"johndoe@email.com",
    id:"1234567890"
    }
]

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
  });

