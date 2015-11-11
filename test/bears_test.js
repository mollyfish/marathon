var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;

process.env.MONGOLAB_URI = 'mongodb://localhost/bear_stream_test';
// connect to a different database so we don't mess up the real db by testing

require(__dirname + '/../server');
// fire up the server

var mongoose = require('mongoose');
// require in mongoose after the server, so we will remember that we modified mongoose in server.js
var Bear = require(__dirname + '/../models/bear');
// allows us to bypass the REST api for testing

describe('bear routes', function() {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      // at the end of the test run, the database will drop  
      // !!! WATCH OUT !!!
      // if you run this test code in a production run, you could drop the real database
      // SO DON'T DO IT.
      done();
    })
  });

  it('should be able to create a bear', function(done) {
    var bearData = {name: 'Test Bear'};
    // test data
    chai.request('localhost:3000')
      .post('/api/bears')
      // request method
      .send(bearData)
      // send test data to database
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.name).to.eql('Test Bear');
        // match to test data
        expect(res.body).to.have.property('_id');
        // checking for the id is the best way to make sure it has actually gone to mongodb
        done();
      });
  });

  it('should be able to get all da bears', function(done) {
    chai.request('localhost:3000')
      .get('/api/bears')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        // this is all we test, b/c we cannot assume the post has been tested first
        // even if there are no bears, we will get an empty array and the test will pass
        done();
      });
  });

  describe('needs a bear', function() {
    beforeEach(function(done) {
      (new Bear({name: 'test bear'})).save(function(err, data) {
        expect(err).to.eql(null);
        this.bear = data;
        done();
      }.bind(this));
    });
    
    it('should be able to modify a bear', function(done) {
      chai.request('localhost:3000')
        .put('/api/bears/' + this.bear._id)
        .send({name: 'not test bear'})
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('success!');
          done();
        });
        // no bind() needed because this it will scope to the nearest describe, which is where the beforeEach is scoped, too
    });

    it('should be able to murder a bear', function(done) {
      chai.request('localhost:3000')
        .delete('/api/bears/' + this.bear._id)
        .send({name: 'sacrificial bear'})
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('success!');
          done();
        });
        // no bind() needed because this it will scope to the nearest describe, which is where the beforeEach is scoped, too
    });
  });

});
