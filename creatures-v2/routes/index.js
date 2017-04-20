var express = require('express');
var router = express.Router();
var user = require('./users');
var session = require('express-session');
var gameRooms = require('../public/javascripts/gameRooms');

/* GET home page. */
router.get('/', function(req, res, next) {
	if (req.session.user) {
		user.findOne({userName: req.session.user.userName}, function(err, doc) {
			req.session.user = doc;
		});
		res.render('index', { title: 'Creatures', name: req.session.user.userName});
	}else{
		res.render('index', { title: 'Creatures', name: "anonymius"});
	}
});

router.post('/login', function(req, res, next) {
	var userName = req.body.userName;
	var password = req.body.password;
	
	user.findOne({userName: userName, password: password}, function(err, user) {
		if (err) {
			console.log(err);
			return res.status(500).send();	
		}
		
		if (!user) {
			return res.status(404).send();
		}
		req.session.user = user;
		res.redirect('/');
	});
});

router.get('/logout', function(req, res, next) {
	req.session.destroy();
	res.redirect('/');
});

router.get('/createAgame', function(req, res, next) {
	if (req.session.user) {
		var name = req.session.user.userName;
		var rating = req.session.user.rating;
		gameRooms.insert(name, rating, 14, "10+3");
	}else{
		var name = "anonymius";
		var rating = 0;
	}
	
	res.redirect('/');
});

router.get('/joinGame/:index', function(req, res, next) {
	if (req.session.user && gameRooms.rooms[req.params.index].state == "waiting") {
		gameRooms.join(req.session.user.userName, req.session.user.rating, req.params.index);
		res.redirect('/game_room/' + req.params.index);
	}else{
		res.redirect('/');
	}
});

module.exports = router;
