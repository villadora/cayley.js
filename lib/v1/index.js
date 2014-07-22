var util = require('util');

var Gremlin = require('./gremlin');

var api = {
  gremlin: function(client) {
    return new Gremlin(client);
  }
};

module.exports = api;
