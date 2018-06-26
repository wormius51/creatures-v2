var express = require('express');
var router = express.Router();
var user = require('./users');
var session = require('express-session');
var puzzleMaster = require('../puzzles/puzzleMaster');
console.log(puzzleMaster);
console.log("puzzle.js loaded");

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log("user puzzle");
	if (req.session.user) {
		user.findOne({userName: req.session.user.userName}, function(err, doc) {
			req.session.user = doc;
		});
		res.render('puzzle', { title: 'Creatures puzzle', name: req.session.user.userName, message: ""});
	}else{
		res.render('puzzle', { title: 'Creatures puzzle', name: "anonymius", message: ""});
	}
});

//GET a speciphic pazzle.
router.get('/:puzzleNumber', function(req, res, next) {
	if (req.params.puzzleNumber >= puzzleMaster.puzzles.length) {
		res.redirect('/puzzle/' + (puzzleMaster.puzzles.length - 1));
	} else {
		var name = "anonymius";
		if (req.session.user) {
			user.findOne({userName: req.session.user.userName}, function(err, doc) {
				req.session.user = doc;
			});
			name = req.session.user.useName;
		}
	
		var puzzle = puzzleMaster.puzzles[req.params.puzzleNumber];
		console.log(puzzle.position);
		var notLast = true;
		if (req.params.puzzleNumber == (puzzleMaster.puzzles.length * 1 - 1)) {
			notLast = false;
		}
		console.log("notLast: " + notLast);
		console.log("puzzles length:" + puzzleMaster.puzzles.length);
		var nextPuzzle = req.params.puzzleNumber * 1 + 1;
		res.render('puzzle', {title: 'puzzle ' + req.params.puzzleNumber, name: name, notLast: notLast, nextPuzzle: nextPuzzle, position: puzzle.position, solution: puzzle.solution, description: puzzle.description, endComment: puzzle.endComment});
	}
});


module.exports = router;