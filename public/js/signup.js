var express = require("express");
var bodyParser = require("body-parser");
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/usrreg');
var db = mongoose.connection;

db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback) {
    console.log("MongoDB connection succeeded");
});

var app = express();

// Middleware setup
app.use(bodyParser.json());
app.use(express.static('c code'));
app.use(bodyParser.urlencoded({ extended: true }));



// POST endpoint for user sign-up
app.post('/sign_up', function(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var pass = req.body.password;

    var data = {
        "name": name,
        "email": email,
        "password": pass,
    };

    // Insert the data into MongoDB
    db.collection('stayspot').insertOne(data, function(err, collection) {
        if (err) throw err;
        console.log("Record inserted successfully");
    });

    // Redirect to success page
    return res.redirect('signup_success.html');
});

// Default route to serve the main page
app.get('/', function(req, res) {
    res.set({
        'Access-Control-Allow-Origin': '*'
    });
    return res.redirect('signup.html');
}).listen(3000) 


console.log("server listening at port 3000");
