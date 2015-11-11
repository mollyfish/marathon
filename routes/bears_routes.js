var express = require('express');
var bodyParser = require('body-parser');
var Bear = require(__dirname + '/../models/bear');
var handleError = require(__dirname + '/../lib/handleServerError');

var bearsRouter = module.exports = exports = express.Router();

bearsRouter.get('/bears', function(req, res) {
  // don't forget to put /api into the address bar
  // Bear.find({name: 'Yogi'}, function(err, data) {
    // given a search param
  Bear.find({}, function(err, data) {
  // empty obj will return everything

    // Bear has the find() method b/c it was made with mongoose
    if (err) return console.log(err);

    res.json(data);
  });
})

bearsRouter.post('/bears', bodyParser.json(), function(req, res) {
  var newBear = new Bear(req.body);
  newBear.save(function(err, data) {
    if (err) return handleError(err, res);

    res.json(data);
    // like res.send, but this way it's very clear that json is being sent
  });
});


bearsRouter.put('/bears/:id', bodyParser.json(), function(req, res) {
  var bearData = req.body;
  delete bearData._id;
  // this is anticipating an Angular thing. We are deleting the id off the stuff that gets passed into 'update', so it can't be overwritten and make mongodb pitch a fit
  Bear.update({_id: req.params.id}, bearData, function(err) {
    if (err) return handleError(err, res);

    res.json({msg: 'success!'});
  });
});

bearsRouter.delete('/bears/:id', function(req, res) {
  Bear.remove({_id: req.params.id}, function(err) {
    if (err) return handleError(err, res);

    res.json({msg: 'success!'});
  });
});