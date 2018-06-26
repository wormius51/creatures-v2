// a bot that does absolutely nothing.

function move (position, isBlueTurn, amIBlue) {
	if ((isBlueTurn && !amIBlue) || (!isBlueTurn && amIBlue)) {
		return "not my turn";
	}
}

module.exports.move = move;