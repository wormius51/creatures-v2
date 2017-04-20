user = require('./users');
//changes rating according to result of a game.
function ratingChange(bluePlayer, bluePlayerRating, redPlayer, redPlayerRating, result) {
	switch (result) {
		case "blue wins":
			var change = ratingWinFormula(bluePlayerRating, redPlayerRating);
			user.findOne({userName: bluePlayer}, function (err, doc) {
				doc.rating += change;
				doc.rating = Math.floor(doc.rating);
				doc.save();
			});
			
			user.findOne({userName: redPlayer}, function (err, doc) {
				doc.rating -= change;
				doc.rating = Math.floor(doc.rating);
				doc.save();
			});
		break;
		case "red wins":
			var change = ratingWinFormula(redPlayerRating, bluePlayerRating);
			user.findOne({userName: redPlayer}, function (err, doc) {
				doc.rating += change;
				doc.rating = Math.floor(doc.rating);
				doc.save();
			});
			
			user.findOne({userName: bluePlayer}, function (err, doc) {
				doc.rating -= change;
				doc.rating = Math.floor(doc.rating);
				doc.save();
			});
		break;
		case "draw":
			var change = ratingDrawFormula(bluePlayerRating, redPlayerRating);
			if (bluePlayerRating > redPlayerRating) {
				user.findOne({userName: bluePlayer}, function (err, doc) {
					doc.rating -= change;
					doc.rating = Math.floor(doc.rating);
					doc.save();
				});
				
				user.findOne({userName: redPlayer}, function (err, doc) {
					doc.rating += change;
					doc.rating = Math.floor(doc.rating);
					doc.save();
				});
			}else{
				user.findOne({userName: bluePlayer}, function (err, doc) {
					doc.rating += change;
					doc.rating = Math.floor(doc.rating);
					doc.save();
				});
			
				user.findOne({userName: redPlayer}, function (err, doc) {
					doc.rating -= change;
					doc.rating = Math.floor(doc.rating);
					doc.save();
				});
			}
	}
	console.log("rating change");
}
//calculates thr change of rating in case of a win.
function ratingWinFormula(winner, loser) {
	var change = 16*(1+(winner - loser)/400);
	return change;
}
//calculates the change of rating in case of a draw.
function ratingDrawFormula(a, b) {
	var change = 16*((a - b)/400);
	return change;
}

module.exports.ratingChange = ratingChange;