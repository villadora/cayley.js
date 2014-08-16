var apis = {
  'v1': require('./v1')
};

module.exports = Client;

function Client(options) {
  options = options || {};

  this.host = options.host.replace(/\/+$/, '');
  var api = apis[options.apiVersion || 'v1'];

  this.request = require('request').defaults(options);

  for(var m in api) {
    var ex = api[m];
    if (typeof ex == 'function')
      this[m] = ex.bind(this);
    else if(typeof ex == 'object' && ex.factory) {
      this[m] = ex.factory(this);
      if(ex.alias) {
        this[ex.alias] = this[m];
      }
    }else {
      this[m] = ex;
    }
  }
}
