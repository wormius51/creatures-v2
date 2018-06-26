var express = require('express');
var router = express.Router();
var user = require('./users');
console.log("offline.js loaded");
/* GET offline page. */
router.get('/', function(req, res, next) {
	console.log("offline play");
	res.render('offline');
});

module.exports = router;