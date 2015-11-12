var mongoose = require('mongoose');

var workoutSchema = new mongoose.Schema({
  sport: String,
  distance: Number,
  units: String,
  date: { type: Date, default: Date.now },
  notes: String
});

module.exports = mongoose.model('Workout', workoutSchema);
