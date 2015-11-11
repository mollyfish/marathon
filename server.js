var mongoose = require('mongoose');
var express = require('express');
var app = express();
var bearsRouter = require(__dirname + '/routes/bears_routes');
var port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/bear_stream_dev');
// mongoose_dev is the database name for the project
// MONGOLAB_URI is the database connection string once we deploy to Heroku

app.use('/api', bearsRouter);

app.listen(port, function() {
  console.log('server is up on port ' + port);
});



// MONGO DB NOTES

// IN THE TERMINAL, at the root of your project, make a directory called db
// this creates a fresh database for each app

// THEN run
// mongod --dbpath=./db --smallfiles

// IN MONGO
// > show dbs
// > use database_name
// switched to db database_name
// > db.bears.find().pretty()
// returns all bears objects from the database