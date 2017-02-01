var express = require('express');
var listRouter = express.Router();
var app = express();
var List = require('../client/src/models/list');

var ListQuery = require('../db/listQuery');
var query = new ListQuery();


listRouter.get('/', function (req, res) {
    query.all(function(results) {
        res.json(results);
    });
});

listRouter.put('/', function(req, res) {
    var list = new List(req.body);
    query.update(list, function(results) {
        res.json(results);
    })
});

listRouter.post('/', function(req, res) {
  var film = new List({
    name: req.body.name, 
  });
  films.push(list);
  res.json({data: lists});
});

module.exports = listRouter;