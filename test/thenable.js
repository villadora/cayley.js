'use strict';
/* global describe, it */

var assert = require('chai').assert;
var Q = require('q');
var cayley = require('../');

describe('cayley', function() {
  this.timeout(5000);
  var client = cayley('http://localhost:64210/');
  var g = client.g;

  it('test All', function(done) {
    Q(g.V().All()).then(function(result) {
      assert(result.length);
      done();
    }, done);
  });

  it('test GetLimit', function(done) {
    Q(g.V().GetLimit(5)).then(function(result) {
      assert.equal(result.length, 5);
      done();
    }, done);
  });

  it('test Vertex', function(done) {
    Q(g.Vertex("Humphrey Bogart").All()).then(function(result) {
      assert.equal(result.length, 1);
      assert.equal(result[0].id, 'Humphrey Bogart');
      done();
    }).fail(done);
  });

  it('test V.In', function(done) {
    Q(g.V("Humphrey Bogart").In("name").All()).then(function(result) {
      assert.equal(result.length, 1);
      assert.equal(result[0].id, ":/en/humphrey_bogart");
      done();
    }, done);
  });

  it('test V.Has', function(done) {
    Q(g.V().Has("name", "Casablanca").All()).then(function(result) {
      assert.equal(result.length, 1);
      assert.equal(result[0].id, ":/en/casablanca_1942");
      done();
    }, done);
  });
  
  it('test Morphism', function(done) {
    var filmToActor = g.Morphism().Out("/film/film/starring").Out("/film/performance/actor");
    Q(g.V().Has("name", "Casablanca").Follow(filmToActor).Out("name").All()).then(function(result) {
      assert(result.length);
      done();
    }, done);
  });


  it('test Emit', function(done) {
    this.timeout(10000);
    Q(g.V("Casablanca").ForEach(function(d) { g.Emit(d); })).then(function(result) {
      assert(result.length);
      done();
    }, done);
  });
});
