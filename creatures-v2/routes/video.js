var express = require('express');
var router = express.Router();
console.log("video.js loaded");
/* GET video page. */
router.get('/', function(req, res, next) {
	console.log("video");
	res.render('video');
});

/* GET a video */

router.get('/:videoName', function(req, res, next) {
	console.log("video" + req.params.videoName);
	res.render('video', {videoName: req.params.videoName});
});

module.exports = router;