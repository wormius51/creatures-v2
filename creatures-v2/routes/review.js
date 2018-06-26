var express = require('express');
var session = require('express-session');
var router = express.Router();
var gameRooms = require('../public/javascripts/gameRooms');

/* GET review page. */
router.get('/', function(req, res, next) {
	console.log("user review");
	if (req.session.user) {
		user.findOne({userName: req.session.user.userName}, function(err, doc) {
			req.session.user = doc;
		});
		res.render('review', { title: 'Review', name: req.session.user.userName, password: req.session.user.password, message: ""});
	}else{
		res.render('review', { title: 'Review', name: "anonymius", message: ""});
	}
});

router.get('/:gameRoomIndex', function(req, res, next) {
	console.log("user review " + req.params.gameRoomIndex);
	var PGN = gameRooms.rooms[req.params.gameRoomIndex].gameMaster.PGN;
	var position = gameRooms.rooms[req.params.gameRoomIndex].gameMaster.position;
	var boardSize = gameRooms.rooms[req.params.gameRoomIndex].gameMaster.board.size;
	var bluePlayer = gameRooms.rooms[req.params.gameRoomIndex].bluePlayer;
	var bluePlayerRating = gameRooms.rooms[req.params.gameRoomIndex].bluePlayerRating;
	var redPlayer = gameRooms.rooms[req.params.gameRoomIndex].redPlayer;
	var redPlayerRating = gameRooms.rooms[req.params.gameRoomIndex].redPlayerRating;
	if (req.session.user) {
		user.findOne({userName: req.session.user.userName}, function(err, doc) {
			req.session.user = doc;
		});
		res.render('review', { title: 'Review game ' + req.params.gameRoomIndex, name: req.session.user.userName, password: req.session.user.password, bluePlayer: bluePlayer, bluePlayerRating: bluePlayerRating, redPlayer: redPlayer, redPlayerRating: redPlayerRating, message: "", PGN: PGN,position: position, boardSize: boardSize, index: req.params.gameRoomIndex});
	}else{
		res.render('review', { title: 'Review game ' + req.params.gameRoomIndex, name: "anonymius", bluePlayer: bluePlayer, bluePlayerRating: bluePlayerRating, redPlayer: redPlayer, redPlayerRating: redPlayerRating, message: "", PGN: PGN, position: position, boardSize: boardSize, index: req.params.gameRoomIndex});
	}
});

module.exports = router;