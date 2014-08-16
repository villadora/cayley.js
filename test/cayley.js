'use strict';
/* global describe, it */

var assert = require('chai').assert;
var cayley = require('../');

describe('cayley', function() {
  this.timeout(5000);
  var client = cayley('http://localhost:64210/');
  var g = client.g;

  it('test All', function(done) {
    g.V().All(function(err, result) {
      if(err) return done(err);
      assert(result.length);
      done();
    });
  });

  it('test GetLimit', function(done) {
    g.V().GetLimit(5, function(err, result) {
      if(err) return done(err);
      assert.equal(result.length, 5);
      done();
    });
  });

  it('test Vertex', function(done) {
    g.Vertex("Humphrey Bogart").All(function(err, result) {
      assert.equal(result.length, 1);
      assert.equal(result[0].id, 'Humphrey Bogart');
      done(err);
    });
  });

  it('test V.In', function(done) {
    g.V("Humphrey Bogart").In("name").All(function(err, result) {
      assert.equal(result.length, 1);
      assert.equal(result[0].id, ":/en/humphrey_bogart");
      done(err);
    });
  });

  it('test V.Has', function(done) {
    g.V().Has("name", "Casablanca").All(function(err, result) {
      assert.equal(result.length, 1);
      assert.equal(result[0].id, ":/en/casablanca_1942");
      done(err);
    });
  });
  
  it('test Morphism', function(done) {
    var filmToActor = g.Morphism().Out("/film/film/starring").Out("/film/performance/actor");
    g.V().Has("name", "Casablanca").Follow(filmToActor).Out("name").All(function(err, result) {
      assert(result.length);
      done(err);
    });
  });


  it('test Emit', function(done) {
    this.timeout(10000);
    g.V("Casablanca").ForEach(function(d) { g.Emit(d); }, function(err, result) {
      assert(result.length);
      done(err);
    });
  });

  it('test type shape', function(done) {
    this.timeout(10000);
    var graph = g.type('shape');
    graph.V("Casablanca").All(function(err, result) {
      assert(!result.links && result.nodes);
      done(err);
    });
  });

  it('test write', function(done)  {
    client.write([{
      subject: "/zh/new_movie",
      predicate: "name",
      object: "New Movie"
    }], function(err) {
      if(err) return done(err);
      g.V('New Movie').All(function(err, result) {
        if(err) return done(err);
        assert.equal(result.length, 1);
        assert.equal(result[0].id, "New Movie");
        client.delete([{
          subject: "/zh/new_movie",
          predicate: "name",
          object: "New Movie"
        }], function(err) {
          if(err) return done(err);
          g.V('New Movie').All(function(err, result) {
            assert.equal(result.length, 1);
            assert.equal(result[0].id, "");
            done(err);
          });
        });
      });
    });
  });

});
