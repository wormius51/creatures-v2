var express = require('express');
var session = require('express-session');
var router = express.Router();
var user = require('./users');
console.log("profile.js loaded");
/* GET tutorial page. */
router.get('/:player', function(req, res, next) {
	var name = "anonymius";
	if (req.session.user) {
		name = req.session.user.userName;
	}
	var name = "anonymius";
	var rating = 1200;
	user.findOne({userName: req.params.player}, function(err, doc) {
		name = doc.userName;
		rating = doc.rating;
	});
	
	res.render('profile', {name: name, player: player, rating: rating});
});

module.exports = router;