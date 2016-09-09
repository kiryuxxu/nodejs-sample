var express = require('express');
var util = require('util');
var app = express();
var PORT = 3000;

app.database = {};

app.all('/*', function(req, res, next) {
  console.log(util.format('url: %s\n', req.url));
  next();
});

app.get('/', (req, res) => {
  res.json(app.database);
});

app.get('/get/:key', function(req, res) {
  var key = req.params.key;
  var value = app.database[key];
  console.log(value);
  res.send(value);
});

app.get('/set/:key/:value', function(req, res) {
  var key = req.params.key;
  var value = req.params.value;

  app.database[key] = value;
  res.send(util.format('%s is updated', key));

  console.log(app.database);
});

app.listen(PORT);
