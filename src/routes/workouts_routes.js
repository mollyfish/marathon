var express = require('express');
var bodyParser = require('body-parser');
var Workout = require(__dirname + '/../models/workout');
var handleError = require(__dirname + '/../lib/handleServerError');

var workoutsRouter = module.exports = exports = express.Router();

workoutsRouter.get('/workouts', function(req, res) {
  // don't forget to put /api into the address bar
  // Workout.find({sport: 'swim'}, function(err, data) {
    // given a search param
  Workout.find({}, function(err, data) {
  // empty obj will return everything

    // Workout has the find() method b/c it was made with mongoose
    if (err) return console.log(err);

    res.json(data);
    res.send('all the workouts!');
  });
})

workoutsRouter.post('/workouts', bodyParser.json(), function(req, res) {
  var newWorkout = new Workout(req.body);
  newWorkout.save(function(err, data) {
    if (err) return handleError(err, res);

    res.json(data);
    // like res.send, but this way it's very clear that json is being sent
  });
});

workoutsRouter.put('/workouts/:id', bodyParser.json(), function(req, res) {
  var workoutData = req.body;
  delete workoutData._id;
  // this is anticipating an Angular thing. We are deleting the id off the stuff that gets passed into 'update', so it can't be overwritten and make mongodb pitch a fit
  Workout.update({_id: req.params.id}, workoutData, function(err) {
    if (err) return handleError(err, res);

    res.json({msg: 'success!'});
  });
});

workoutsRouter.delete('/workouts/:id', function(req, res) {
  Workout.remove({_id: req.params.id}, function(err) {
    if (err) return handleError(err, res);

    res.json({msg: 'success!'});
  });
});
