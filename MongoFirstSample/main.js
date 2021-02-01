var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors'); //needed for a communication with httpclient and angular
// create express app
var app = express();

//var path=require("path");
// var ejs=require("ejs");

// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'app/views'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors()); 
// parse application/json
app.use(bodyParser.json())

// Configuring the database
var dbConfig = require('./config/database_config.js');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
	useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome "});
});

require('./app/routes/stud.routes.js')(app);

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});

