var express = require('express');
var router = express.Router();
var session = require('express-session');

/* GET levelMode page. */
router.get('/', function(req, res, next) {
	req.render('levelMode', {title: "level mode"});
});

