var util = require('util');
var Client = require('./lib/client');

module.exports = function(uri, options) {
  if (typeof uri === 'undefined') throw new Error('undefined is not a valid uri or options object.')
  if (options && typeof options === 'object') {
    options = util._extend({uri: uri}, options);
  } else if (typeof uri === 'string') {
    options = {uri:uri}
  } else {
    options = util._extend({}, uri);
  }
  return new Client(options);
};
