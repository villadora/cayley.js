# cayley.js 
[![NPM version](https://badge.fury.io/js/cayley.svg)](http://badge.fury.io/js/cayley)

<!-- [![Build Status](https://travis-ci.org/villadora/cayley.js.svg?branch=master)](https://travis-ci.org/villadora/cayley.js) -->

[Cayley](http://github.com/google/cayley) client for nodejs.

## Install

```bash
$ npm install cayley --save
```

## Usage

You just need to copy the code of Gremlin!

```js
var cayley = require('cayley');

var client = cayley("http://localhost:64210/");

var g = graph = client.graph;
// or 
g = graph = client.g;

g.V().All(function(err, result) {
   // get result
});

g.V().GetLimit(5, function(err, result) {});

g.V("Humphrey Bogart").In("name").All(function(err, result) {});


// And you can create Morphism in you javascript code
var filmToActor = g.Morphism().Out("/film/film/starring").Out("/film/performance/actor");

g.V().Has("name", "Casablanca").Follow(filmToActor).Out("name").All(function(err, result) {});

```

When you want to query shape, `g.type('shape')` will return a new graph which return shape for query:

```javascript
// to query shape
g = g.type('shape');
g.V().GetLimit(5, function(err, result) {
   // shape will return
});
```


Also simple write/delete APIs are implemented:

```javascript
var client = cayley("http://localhost:64210/");
client.write([{
  subject: "Subject Node",
  predicate: "Predicate Node",
  object: "Object Node"
}], function(err, body, res) {

});

client.delete([{
  subject: "Subject Node",
  predicate: "Predicate Node",
  object: "Object Node"
}], function(err, body, res) {

});
```


### cayley(host, [options])

_options_ will be passed to _request_, so you can add settings like _proxy_, _headers_.



## TODOs

* mql api


## Licence

MIT
<!-- do not want to make nodeinit to complicated, you can edit this whenever you want. -->
