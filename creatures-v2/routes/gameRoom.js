var express = require('express');
var router = express.Router();
var session = require('express-session');
var gameRooms = require('../public/javascripts/gameRooms');

/* GET game room page. */
router.get('/:index', function(req, res, next) {
	var bluePlayer = gameRooms.rooms[req.params.index].bluePlayer;
	var bluePlayerRating = gameRooms.rooms[req.params.index].bluePlayerRating;
	var redPlayer = gameRooms.rooms[req.params.index].redPlayer;
	var redPlayerRating = gameRooms.rooms[req.params.index].redPlayerRating;
	var player = 0;
	if (req.session.user) {
		if (req.session.user.userName == bluePlayer) {
			player = 1;
		}
		if (req.session.user.userName == redPlayer) {
			player = 2;
		}
	}
	console.log(bluePlayer + " " + bluePlayerRating + " " + redPlayer + " " + redPlayerRating);
	gameRooms.rooms[req.params.index].gameMaster.getPosition();
	if (req.session.user) {
		res.render('gameRoom',{ title: bluePlayer + " vs " + redPlayer, me: req.session.user.userName, password: req.session.user.password, bluePlayer: bluePlayer, bluePlayerRating: bluePlayerRating, redPlayer: redPlayer, redPlayerRating: redPlayerRating, player: player, index: req.params.index , position: gameRooms.rooms[req.params.index].gameMaster.currentPosition, boardSize: gameRooms.rooms[req.params.index].gameMaster.board.size, state: gameRooms.rooms[req.params.index].state});
	}else {
		res.render('gameRoom',{ title: bluePlayer + " vs " + redPlayer, me: "Anonnymius", bluePlayer: bluePlayer, bluePlayerRating: bluePlayerRating, redPlayer: redPlayer, redPlayerRating: redPlayerRating, player: player, index: req.params.index , position: gameRooms.rooms[req.params.index].gameMaster.currentPosition, boardSize: gameRooms.rooms[req.params.index].gameMaster.board.size});
	}
});
/*
//ask the game master to select a partical.
router.get('/:roomIndex/:particalIndex', function(req, res, next) {
	console.log(req.session.user.userName + " requests a select");
	if ((gameRooms.rooms[req.params.roomIndex].bluePlayer == req.session.user.userName && gameRooms.rooms[req.params.roomIndex].gameMaster.isBlueTurn) || (gameRooms.rooms[req.params.roomIndex].redPlayer == req.session.user.userName && !gameRooms.rooms[req.params.roomIndex].gameMaster.isBlueTurn) ) {
		console.log(req.session.user.userName +"'s request was accepted.");
		gameRooms.rooms[req.params.roomIndex].gameMaster.select(req.params.particalIndex);
		console.log("select: " + req.params.particalIndex);
	}else{
		console.log(req.session.user.userName +"'s request was rejected.");
		if (gameRooms.rooms[req.params.roomIndex].gameMaster.isBlueTurn) {
			console.log("blue's turn");
		}else{
			console.log("red's turn");
		}
	}
	res.redirect('/game_room/' + req.params.roomIndex);
});

//resign the game.
router.get('/resign/:roomIndex/:none', function(req,res, next) {
	console.log("resing request at game: " + req.params.roomIndex);
	if (req.session.user) {
		if (gameRooms.rooms[req.params.roomIndex].bluePlayer == req.session.user.userName) {
			gameRooms.rooms[req.params.roomIndex].gameMaster.resign("blue");
		}
		if (gameRooms.rooms[req.params.roomIndex].redPlayer == req.session.user.userName) {
			gameRooms.rooms[req.params.roomIndex].gameMaster.resign("red");
		}
	}
	res.redirect('/game_room/' + req.params.roomIndex);
});
*/

module.exports = router;