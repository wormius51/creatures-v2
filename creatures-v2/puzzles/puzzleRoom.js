//handles the an instance of puzzle solving.

var counter = -1;
module.exports = function () {
	counter++;
	var puzzleRoom = {
		puzzle: 0,
		solver: "randomius",
		attempts: 0,
	};
	
	return puzzleRoom;
};