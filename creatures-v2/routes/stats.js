var express = require('express');
var router = express.Router();
var user = require('./users');
var session = require('express-session');
var statistics = require('../statistics/statistics');
console.log("stats.js loaded");
/* GET stats page. */
router.get('/', function(req, res, next) {
	var userList = new Array();
	var displayUsers = new Array();
		
	user.find({}, function(err, users) {
		var i = 0;
		users.forEach(function(user) {
			userList[i] = {name: user.userName, rating: user.rating};
			i++;
		});
		userList.sort(function (a, b) {
			return b.rating - a.rating;
		});
		for (i=0;i<userList.length;i++) {
			displayUsers[i] = userList[i].name + " " + userList[i].rating;
		}
	
		var name = "anonymius";
		if (req.session.user) {
			name = req.session.user.userName;
		}
			
		res.render('stats', { title: 'Creatures stats', message: displayUsers, name: name});
	
	});

});

module.exports = router;