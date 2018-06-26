var express = require('express');
var router = express.Router();
var user = require('./users');
var session = require('express-session');

/* GET register page. */
router.get('/', function(req, res, next) {
	var message = "";
	if (req.session.name) {
		message = req.session.name + " is allready taken.";
	}
	res.render('register', { title: 'Creatures register', message: message });
});
//register a user un mongoDB.
router.post('/submit', function(req, res, next) {
	var userName = req.body.userName;
	if (req.session.name) {
		req.session.destroy();
	}
	user.findOne({userName: userName}, function(err, doc) {
		if (doc || userName == "anonymius") {
			req.session.name = userName;
			res.redirect('/register');	
		}else {
			var password = req.body.password;
			var newUser = {userName: userName, password: password};
			var data = new user(newUser);
			data.save(function(err, savedUser) {
			if (err) {
				console.log(err);
				return res.status(500).send();	
			}
			req.session.user = savedUser;
			res.redirect('/');
			return res.status(200).send();
			});
		}
	});
});

module.exports = router;
