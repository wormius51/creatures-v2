var express = require('express');
var session = require('express-session');
var router = express.Router();

/* GET tutorial page. */
router.get('/:page', function(req, res, next) {
	var name = "anonymius";
	if (req.session.user) {
		name = req.session.user.userName;
	}
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
	var position = "";
	switch (1 * req.params.page) {
		case 0:
		paragraphText.push("Welcome to Creatures.");
		paragraphText.push("Creatures is a two player strategy game.");
		paragraphText.push("The goal of the game is to destroy ");
		paragraphText.push("all of the enemy creatures.");
		
		position = "n=6";
		break;
		case 1:
		paragraphText.push("The board is made of \"L\" shaped");
		paragraphText.push("parts that can rotate and connect");
		paragraphText.push("to other parts by two points.");
		paragraphText.push("A group of parts that are");
		paragraphText.push("connected are called a");
		paragraphText.push("creature. Here is an example");
		paragraphText.push("of a neutral creature.");
		
		position = "n=4,1x0=n0dl,1x1=n0ur,2x2=n0ur,3x2=n0dl";
		break;
		case 2:
		paragraphText.push("Creatures belong to a player if the");
		paragraphText.push("creature has the player's core in it.");
		paragraphText.push("This entire shape, including all of");
		paragraphText.push("the parts, is a blue core.");
		
		position = "n=2,0x0=nbdr,1x0=nbdl,0x1=nbur,1x1=nbur";
		break;
		case 3:
		paragraphText.push("Creatures can be more than");
		paragraphText.push("just the core. They can also");
		paragraphText.push("be a core connected");
		paragraphText.push("to more parts. Only the four left most parts");
		paragraphText.push("of the creature are the core.");
		
		position = "n=4,0x0=nbdr,1x0=nbdl,0x1=nbur,1x1=nbur,2x1=nbdl,2x2=nbur,3x2=nbdl,3x3=nbur";
		break;
		case 4:
		paragraphText.push("Here's a red core.");
		paragraphText.push("It makes creatures belong");
		paragraphText.push("to the red player.");
		
		position = "n=2,0x0=nrdl,1x0=nrdl,0x1=nrur,1x1=nrul";
		break;
		case 5:
		paragraphText.push("If a creature has a blue and");
		paragraphText.push("a red core it is purple and");
		paragraphText.push("both players control it.");
		
		position = "n=3,0x1=npdr,0x2=npur,1x1=npdl,2x1=npdl,1x2=npur,2x2=npul";
		break;
		case 6:
		paragraphText.push("Creatures don't move by stepping");
		paragraphText.push("from one square to another. Instead");
		paragraphText.push("they copy from one point to");
		paragraphText.push("another. In this example the");
		paragraphText.push("right bottom part is clicked.");
		
		position = "n=4,1x2=n0dl,2x1=nbdr,3x1=nbdl,2x2=nbul,3x2=ybul,0x2=n0ul";
		break;
		case 7:
		paragraphText.push("Now the left bottom part");
		paragraphText.push("is clicked. The entire creature");
		paragraphText.push("would be copied from the right");
		paragraphText.push("to the left. Note that you can");
		paragraphText.push("only copy a creature to one");
		paragraphText.push("of its own parts.");
		
		position = "n=4,1x2=n0dl,2x1=nbdr,3x1=nbdl,2x2=cbul,3x2=nbul,0x2=n0ul";
		break;
		case 8:
		paragraphText.push("The creature has been copied.");
		paragraphText.push("The parts that were a part of it");
		paragraphText.push("didn't disappear but are now");
		paragraphText.push("parts of a neutral creature.");
		paragraphText.push("In this way you can leave");
		paragraphText.push("parts behind and use them");
		paragraphText.push("to build bigger creatures.");
		
		position = "n=4,1x1=nbdr,1x2=n0dl,2x1=nbdl,3x1=n0dl,2x2=nbul,3x2=n0ul,1x2=nbul,0x2=n0ul";
		break;
	}
	console.log(paragraphText[0]);
	res.render('tutorial', { title: 'Creatures tutorial',name: name, position: position, pagePicture: picture, page: req.params.page, nextPage: nextPage, previousPage: previousPage, paragraphText: paragraphText,});
});

module.exports = router;