//handels the user trying to solve the puzzle.
var puzzleFactory = require('./puzzle');
var puzzles = new Array();
var puzzleMasters = new Array();
console.log("puzzleMaster.js was loaded");

function insert (position, solution, description, endComment) {
	console.log("push: ");
	var puzzle = new puzzleFactory(position, solution, description, endComment);
	puzzles.push(puzzle);
	
}


function puzzleMasterFactory (puzzleNumber) {
	var puzzleMaster = {
		puzzle: puzzles[puzzleNumber],
	};
	
	return puzzleMaster;
}
//destruction puzzles
insert("n=4,0x2=nbdr,1x2=nbdl,3x1=nrul,2x1=nrur,0x3=nbur,1x3=nbur,2x3=nbul,1x0=nrdr,2x0=nrdl,3x0=nrdl", "0x3->1x2", "Use the blue creature to destroy the red in one move, remeber that you can only select parts of your creature.", "Good job! the red creature is now destroyed, just one part of it got disconnected and that is enough.");
insert("n=4,0x0=n0dl,1x0=n0dl,0x1=n0ur,1x1=n0ul,2x2=n0dr,3x2=n0dl,2x3=n0ur,3x3=n0ur", "3x3->2x2", "Again, destroy the red creature in one move.", "You got it!");
insert("n=6,4x1=n0ur,5x1=n0ul,1x3=n0dr,2x3=n0dl,0x4=n0dr,1x4=n0ul,2x4=n0ul,0x5=n0ul", "0x5->2x3", "Now its farther away, how to get it? (in one move)", "You are the best!");
insert("n=8,5x2=n0dr,6x2=n0dl,7x2=n0dr,7x3=n0ul,5x3=n0ur,6x3=n0ur,3x4=n0dl,2x4=n0dl,3x5=n0ul,2x5=n0ur,2x3=n0ul,2x2=n0dr,3x2=n0dl,3x3=n0ur,4x3=n0ul", "7x2->5x3", "Now that is a serious creature, it has two red cores, destroy both of them in one move.", "2 e z 4 u. (too easy for you)");
//purple puzzles
insert("n=6,2x1=n0dl,1x2=n0ur,2x2=n0ur,3x3=n0dr,4x3=n0dr,5x3=n0dl,3x4=n0ur,3x2=n0ur", "1x1->2x2", "This purple creature has a blue core and a red core, which means both players can controll it. Destroy the red core in one move.", "Insert compliment here.");
insert("n=6,2x3=n0dr,3x3=n0dl,3x4=n0ur,4x3=n0dl,2x4=n0ur,2x2=n0ur,4x2=n0ur,5x2=n0ul,4x1=n0dr,5x1=n0dr", "2x4->4x3", "Purple creatures can be controlled by both players because they have a blue and a red core. destroy all the red cores in one move.", "COMBO!");
//growth puzzles
insert("n=6,0x4=n0dr,1x4=n0dl,2x4=n0ur,3x3=n0dr,3x2=n0ur,3x5=n0ur", "0x5->1x4", "Connect your creature to the gray parts to get a bigger creature.", "That is a big creature alright. :P");
insert("n=6,2x1=n0ur,3x1=n0ur,1x1=n0dl,4x1=n0dr,1x2=n0dl,1x3=n0ul,4x2=n0dr,4x3=n0ur,2x2=n0dl,3x2=n0dr,0x1=n0dl,5x1=n0dr", "2x0->3x1", "Connect your creature to the gray parts to get a bigger creature.", "yep.");
insert("n=5,3x3=n0ur,4x3=n0ur,4x2=n0ur,4x4=n0dr,4x0=n0ur,4x1=n0ur,3x4=n0dr,2x4=n0dl,1x4=n0dl,0x4=n0dl,3x1=n0ur,3x0=n0ur,2x1=n0ul,2x0=n0ul,1x1=n0ul,1x0=n0ul,0x0=n0ul,0x1=n0ul,0x2=n0ul,1x2=n0ul,0x3=n0dl,1x3=n0dl", "3x3->2x2", "Here you have no way to connect to the gray parts. Find a different way to get a bigger creature." , "Corrct! You copied your creature up left, only the top left part of your original creature was changed becouse you copied your creature there. Then the copy of the original creature connected to two of the original parts so thats why they are blue.");
//multiplition puzzles
insert("n=6,1x3=n0dr,2x3=n0dl", "1x4->3x4", "Play a move such that you would have two creatures (if a creature has a blue core it is yours).", "YEE, you left a whole core behind. Becouse you only changed the part you copied to in the original creature, the other creature is the copy you created.");
insert("n=8,0x4=n0dr,1x4=n0dl,2x5=n0dl,5x5=n0dr,6x5=n0dl", "0x5->2x5", "Play a move to create a creature with two cores.", "Correct, this creature has two cores. You even left a core behind.");

module.exports.puzzles = puzzles;