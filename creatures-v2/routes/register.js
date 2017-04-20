var express = require('express');
var router = express.Router();
var user = require('./users');

/* GET register page. */
router.get('/', function(req, res, next) {
  res.render('register', { title: 'Creatures register' });
});
//register a user un mongoDB.
router.post('/submit', function(req, res, next) {
	var userName = req.body.userName;
	var password = req.body.password;
	var newUser = {userName: userName, password: password};
	var data = new user(newUser);
	data.save(function(err, savedUser) {
		if (err) {
			console.log(err);
			res.status(500).send();	
		}
		res.status(200).send();
	});
	res.redirect('/');
});

module.exports = router;
