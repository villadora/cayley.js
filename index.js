var util = require('util');
var Client = require('./lib/client');

module.exports = function(host, options) {
  if (typeof host === 'undefined') throw new Error('undefined is not a valid uri or options object.')
  if (options && typeof options === 'object') {
    options = util._extend({host: host}, options);
  } else if (typeof host === 'string') {
    options = {host:host}
  } else {
    options = util._extend({}, host);
  }
  return new Client(options);
};
