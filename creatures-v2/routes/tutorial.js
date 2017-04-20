var express = require('express');
var router = express.Router();

/* GET tutorial page. */
router.get('/:page', function(req, res, next) {
	var picture = "../images/buttons/tutorial" + req.params.page + ".bmp";
	var nextPage = 1 * req.params.page + 1;
	var previousPage = 1 * req.params.page -1;
	if (nextPage > 8) {
		nextPage = 8;
	}
	if(previousPage < 0) {
		previousPage = 0;
	}
	var nextPage = "/tutorial/" + nextPage;
	var previousPage = "/tutorial/" + previousPage;
	
	var paragraphText = new Array();
	switch (1 * req.params.page) {
		case 0:
		paragraphText.push("Welcome to Creatures.");
		paragraphText.push("Creatures is a two player strategy game.");
		paragraphText.push("The goal of the game is to destroy ");
		paragraphText.push("all of the enemy creatures.");
		break;
		case 1:
		paragraphText.push("The board is made of \"L\" shaped");
		paragraphText.push("parts that can rotate and connect");
		paragraphText.push("to other parts by two points.");
		paragraphText.push("A group of parts that are");
		paragraphText.push("connected are called a");
		paragraphText.push("creature. Here is an example");
		paragraphText.push("of a neutral creature.");
		break;
		case 2:
		paragraphText.push("Creatures belong to a player if");
		paragraphText.push("the creature has the player's core in it.");
		paragraphText.push("Here is the pattern that is");
		paragraphText.push("the blue core. It is a whole");
		paragraphText.push("creature by itself.");
		break;
		case 3:
		paragraphText.push("Creatures can be more than");
		paragraphText.push("just the core. They can also");
		paragraphText.push("be a core connected");
		paragraphText.push("to more parts.");
		break;
		case 4:
		paragraphText.push("Here's a red core.");
		paragraphText.push("It makes creatures belong");
		paragraphText.push("to the red player.");
		break;
		case 5:
		paragraphText.push("If a creature has a blue and");
		paragraphText.push("a red core it is purple and");
		paragraphText.push("both players control it.");
		break;
		case 6:
		paragraphText.push("Creatures don't move by stepping");
		paragraphText.push("from one square to another. Instead");
		paragraphText.push("they copy from one point to");
		paragraphText.push("another. In this example the");
		paragraphText.push("right bottom part is clicked.");
		break;
		case 7:
		paragraphText.push("Now the left bottom part");
		paragraphText.push("is clicked. The creature would");
		paragraphText.push("be copied from the right to");
		paragraphText.push("the left. Note that you can");
		paragraphText.push("only copy a creature to one");
		paragraphText.push("of its own parts.");
		break;
		case 8:
		paragraphText.push("The creature has been copied.");
		paragraphText.push("The parts that were a part of it");
		paragraphText.push("didn't disappear but are now");
		paragraphText.push("parts of a neutral creature.");
		paragraphText.push("In this way you can leave");
		paragraphText.push("parts behind and use them");
		paragraphText.push("to build bigger creatures.");
		break;
	}
	console.log(paragraphText[0]);
	res.render('tutorial', { title: 'Creatures tutorial', pagePicture: picture, page: req.params.page, nextPage: nextPage, previousPage: previousPage, paragraphText: paragraphText,});
});

module.exports = router;