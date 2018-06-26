var express = require('express');
var router = express.Router();
var session = require('express-session');
console.log("RPG.js loaded");
//GET the RPG game mode.
router.get('/', function(req, res, next) {
	console.log("user enters RPG");
	
	var name = "anonymius";
	if (req.session.user) {
		name = req.session.user.userName;
	}
	res.render('RPG', {name: name,});
});

module.exports = router;