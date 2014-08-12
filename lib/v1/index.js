var util = require('util');

var Gremlin = require('./gremlin');

var api = {
  g: getGraph,
  graph: getGraph,
  write: function(data, callback) {
    var url = this.host + '/api/v1/write';
    this.request.post({
      url: url,
      body: data,
      json: true
    }, function(err, res, body) {
      console.log(err, res, body);
      callback && callback(err, body, res);
    });
  },
  delete: function(data, callback) {
    var url = this.host + '/api/v1/delete';
    this.request.post({
      url: url,
      body: data,
      json: true
    }, function(err, res, body) {
      callback && callback(err, body, res);
    });
  },
  writeFile: function(name, callback) {
    var url = this.host + '/api/v1/write/file/nquad';
    this.request.post({
    }, function(err, res, body) {
      callback && callback(err, body, res);
    });
  }
};

module.exports = api;


function getGraph() {
  return new Gremlin(this);
}
