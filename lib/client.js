var util = require('util');


module.exports = Client;

function Client(options) {
  this.uri = options.uri;
  this.options = options || {};
  var apiVersion = options.apiVersion || 'v1';
  var api = require('./'+apiVersion);
  this.g = this.graph = api.gremlin(this);
}

Client.prototype.post = function() {

};
