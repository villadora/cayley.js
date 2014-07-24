var util = require('util');

module.exports = Gremlin;
Gremlin.apiVersion = "v1";

function Gremlin(client) {
  this.query = q('query');
  this.shape = q('shape');

  function q(type) {
    return function(text, callback) {
      var url = client.host + '/api/' + Gremlin.apiVersion + '/' + type + '/gremlin';
      client.request.post({
        url: url,
        body: text,
        json: true
      }, callback);
    };
  }
}


Gremlin.prototype.Vertex = Gremlin.prototype.V = function() {
  var query = new Query(['V', toAry(arguments)]);
  query.query = this.query.bind(this);
  return query;
};


Gremlin.prototype.Morphism = Gremlin.prototype.M = function() {
  var path = new Path(['M']);
  path.query = this.query.bind(this);
  return path;
};

function Path() {
  this.calls = toAry(arguments);
  }

var pathGenFun = function(method) {
  Path.prototype[method] = function() {
    this.calls.push([method, toAry(arguments)]);
    return this;
  };
};


// Basic Traversals
['Out', 'In', 'Both', 'Is', 'Has'].forEach(pathGenFun);


// Tagging
['Tag', 'As', 'Back', 'Save'].forEach(pathGenFun);

// Joining
['Intersect', 'Add', 'Union', 'Or'].forEach(pathGenFun);

// Using Morphisms
['Follow', 'FollowR'].forEach(pathGenFun);

Path.prototype.gremlinText = function() {
  if (!this.calls.length)
    return "";

  return 'g.' + this.calls.map(function(call) {
    var method = call[0];
    var args = call[1];
    return method + '(' + (args || []).map(argToString).join(',') + ')';
  }).join('.');
};


function Query() {
  Path.apply(this, arguments);
}

util.inherits(Query, Path);


['All', 'GetLimit', 'ToArray', 'ToValue', 'TagArray', 'TagValue', 'ForEach'].forEach(function(method) {

  Query.prototype[method] = function() {
    var self = this;
    var args = toAry(arguments);
    var callback;

    if (typeof args[args.length - 1] == 'function')
      callback = args.pop();

    self.calls.push([method, args]);

    if (callback) {
      self.query(self.gremlinText(), function(err, res, body) {
        if (err) return callback(err, body && body.error);
        callback(null, body.result);
      });
    }else {
      // TODO: promise
      return {
        then: function(callback) {
          self.query(self.gremlinText(), function(err, res, body) {
            if (err) return callback(err, body && body.error);
            callback(null, body.result);
          });
        }
      };
    }
  };
});


function argToString(arg) {
  /* eqnull: true */
  if (arg == null) {
    return '' + arg;
  } else if (typeof arg === 'string') {
    return '"' + arg + '"';
  } else if (typeof arg == 'function') {
    return arg.toString();
  } else if (util.isArray(arg)) {
    return "[" + arg.map(argToString).join(",") + "]";
  } else if (arg.gremlinText) {
    return arg.gremlinText();
  } else {
    return arg.toString ? arg.toString() : new String(arg);
  }
}

function toAry(args) {
  return Array.prototype.slice.call(args);
}
