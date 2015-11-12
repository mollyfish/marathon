var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var handleError = require(__dirname + '/../lib/handleServerError');

var displayRouter = module.exports = exports = express.Router();

displayRouter.get('*', function(req, res) {
  console.log('workoutsList');
});
