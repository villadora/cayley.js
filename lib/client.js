var apis = {
  'v1': require('./v1')
};

module.exports = Client;

function Client(host, options) {
  options = options || {};

  this.host = host.replace(/\/+$/, '');
  var api = apis[options.apiVersion || 'v1'];

  this.request = require('request').defaults(options);

  for(var m in api) {
    this[m] = api.m.bind(this);
  }
}
