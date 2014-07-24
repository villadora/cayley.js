var util = require('util');


module.exports = Client;

function Client(options) {
  if (typeof options == 'string') {
    options = {
      host: options
    };
  }

  options = options || {};


  this.host = options.host.replace(/\/+$/, '');

  var apiVersion = options.apiVersion || 'v1';
  var api = require('./' + apiVersion);
  this.request = require('request').defaults(options);

  this.g = this.graph = api.gremlin(this);
}
