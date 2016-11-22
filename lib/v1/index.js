var util = require('util');
var fs = require('fs');
var Gremlin = require('./gremlin');

var api = {
  graph: {
    alias: 'g',
    factory: getGraph
  },
  write: function(data, callback) {
    var url = this.host + '/api/v1/write';
    return this.request.post({
      url: url,
      body: data,
      json: true
    }, callback ? function(err, res, body) {
      callback(err, body, res);
    } : undefined);
  },
  delete: function(data, callback) {
    var url = this.host + '/api/v1/delete';
    return this.request.post({
      url: url,
      body: data,
      json: true
    }, callback ? function(err, res, body) {
      callback(err, body, res);
    } : undefined);
  },
  writeFile: function(file, callback) {
    var url = this.host + '/api/v1/write/file/nquad';
    
    var r = this.request.post(url, function(err, res, body) {
      callback && callback(err, body, res);
    });

    var form = r.form();
    form.append('NQuadFile', fs.createReadStream(file));
  }
};

module.exports = api;


function getGraph(host) {
  return new Gremlin(host);
}
