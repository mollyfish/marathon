var mongoose = require('mongoose');
var express = require('express');
var app = express();
var workoutsRouter = require(__dirname + '/src/routes/workouts_routes');
var port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/marathon_dev');
// marathon_dev is the database name for the project
// MONGOLAB_URI is the database connection string once we deploy to Heroku

app.use('/api', workoutsRouter);
app.use(express.static(__dirname + '/../public'));

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
// > db.workouts.find().pretty()
// returns all workout objects from the database