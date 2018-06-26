var express = require('express');
var router = express.Router();
var user = require('./users');
var session = require('express-session');
var gameRooms = require('../public/javascripts/gameRooms');
var statistics = require('../statistics/statistics');
console.log("index.js loaded");
/* GET home page. */
router.get('/', function(req, res, next) {
	console.log("user visit");
	if (req.session.user) {
		user.findOne({userName: req.session.user.userName}, function(err, doc) {
			req.session.user = doc;
		});
		res.render('index', { title: 'Creatures', name: req.session.user.userName, password: req.session.user.password, message: ""});
	}else{
		if (req.session.name) {
			res.render('index', { title: 'Creatures', name: "anonymius", message: req.session.name + " does not exist or password do not match."});
		}else {
			res.render('index', { title: 'Creatures', name: "anonymius", message: ""});
		}
	}
});

router.get('/secsessfull_registeration', function(req, res, next) {
	console.log("user visit");
	if (req.session.user) {
		user.findOne({userName: req.session.user.userName}, function(err, doc) {
			req.session.user = doc;
		});
		res.render('index', { title: 'Creatures', name: req.session.user.userName, password: req.session.user.password, message: ""});
	}else{
		if (req.session.name) {
			res.render('index', { title: 'Creatures', name: "anonymius", message: req.session.name + " registered secsessfully."});
		}else {
			res.render('index', { title: 'Creatures', name: "anonymius", message: "secsessfull registration"});
		}
	}
});

// log in.
router.post('/login', function(req, res, next) {
	var userName = req.body.userName;
	req.session.name = userName;
	var password = req.body.password;
	
	console.log("session login attempt (post): " + userName + " " + password);
	
	user.findOne({userName: userName, password: password}, function(err, user) {
		if (err) {
			console.ogl(err);
			return res.status(500).send();	
		}
		
		if (user) {
			req.session.user = user;
		}
		res.redirect('/');
	});
});

//log out.
router.get('/logout', function(req, res, next) {
	req.session.destroy();
	res.redirect('/');
});

//create a game room.
router.post('/createAgame', function(req, res, next) {
	if (req.session.user) {
		var name = req.session.user.userName;
		var rating = req.session.user.rating;
		var boardSize = 14;
		if (!isNaN(req.body.boardSize) && req.body.boardSize % 2 == 0 && req.body.boardSize > 14 && req.body.boardSize <= 50) {
			boardSize = req.body.boardSize;
		}
		var hours = 0;
		var minuts = 10;
		var seconds = 0;
		var minutsIncrament = 0;
		var secondsIncrament = 3;
		if (!isNaN(req.body.hours) && req.body.hours > 0 && req.body.hours != "") {
			hours = req.body.hours;
		}
		if (!isNaN(req.body.minuts) && req.body.minuts >= 0 && req.body.minuts < 60 && req.body.minuts != "") {
			minuts = req.body.minuts;
		}
		if (!isNaN(req.body.seconds) && req.body.seconds >= 0 && req.body.seconds < 60 && req.body.seconds != "") {
			seconds = req.body.seconds;
		}
		if (!isNaN(req.body.minutsIncrament) && req.body.minutsIncrament >= 0 && req.body.minutsIncrament < 60 && req.body.minutsIncrament != "") {
			minutsIncrament = req.body.minutsIncrament;
		}
		if (!isNaN(req.body.secondsIncrament) && req.body.secondsIncrament >= 0 && req.body.secondsIncrament < 60 && req.body.secondsIncrament != "") {
			secondsIncrament = req.body.secondsIncrament;
		}
		if (hours + minuts + seconds < 1) {
			seconds = 1;
		}
		if (hours + minuts + minutsIncrament + seconds + secondsIncrament < 1) {
			minuts = 10;
			secondsIncrament = 3;
		}
		var timeControll = hours + ":" + minuts + ":" + seconds + "+" + minutsIncrament + ":" + secondsIncrament;
		gameRooms.insert(name, rating, boardSize, timeControll);
	}else{
		var name = "anonymius";
		var rating = 0;
	}
	
	res.redirect('/');
});

//join a game.
router.get('/joinGame/:index', function(req, res, next) {
	if (req.session.user && gameRooms.rooms[req.params.index].state == "waiting") {
		gameRooms.join(req.session.user.userName, req.session.user.rating, req.params.index);
		res.redirect('/game_room/' + req.params.index);
	}else{
		res.redirect('/');
	}
});

//spawn bot.
router.get('/spawn/:botName', function(req, res, next) {
	if (req.session.user && (req.session.user.userName == "wormius" ||  req.session.user.userName == "wormius51")) {
		gameRooms.insertAi(req.params.botName, 14, "0:5:0+0:3");
		res.redirect('/');
	}else{
		res.redirect('/');
	}
});

//spawn bot in a soft position.
router.get('/spawn_soft/:botName', function(req, res, next) {
	if (req.session.user && (req.session.user.userName == "wormius" ||  req.session.user.userName == "wormius51")) {
		gameRooms.insertAi(req.params.botName, 8, "0:15:0+0:5", ["1x2=ur","2x2=ul","6x2=ul","5x2=ur","1x5=dr","2x5=dl","6x5=dl","5x5=dr"]);
		res.redirect('/');
	}else{
		res.redirect('/');
	}
});


module.exports = router;
