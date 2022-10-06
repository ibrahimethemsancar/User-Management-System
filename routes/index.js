var express = require('express');
var router = express.Router();
var database = require('../database')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' , session: req.session });
});

module.exports = router;
