import express from 'express'
var Router = express.Router();

/* GET home page. */
Router.get('/', function(req, res, next) {
  res.send("Hello index");
});

export default Router
