var util = require('util');

module.exports = Gremlin;

function Gremlin(client) {
  this.post = client.post.bind(client);
}


Gremlin.prototype.Vertex = Gremlin.prototype.V =  function() {
  return new Query(['V', Array.prototype.slice.call(arguments)]);
};


Gremlin.prototype.Morphism = Gremlin.prototype.M = function() {
  return new Path();
};

function Path() {
  this.calls = Array.prototype.slice.call(arguments);
}

Path.prototyope.Out = function() {
};

Path.prototype.Has;


function Query(calls) {
  this.calls = Array.prototype.slice.call(arguments);
}

util.inherits(Query, Path);

Query.prototype.All;
Query.prototype.GetLimit;
Query.prototype.ForEach;
// ...

