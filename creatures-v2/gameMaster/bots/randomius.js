//a bot that plays complitly random moves.
console.log("randomius.js loaded");

function move (position, isBlueTurn, amIBlue) {
	if ((isBlueTurn && !amIBlue) || (!isBlueTurn && amIBlue)) {
		return "not my turn";
	}
	else {
		var choises = new Array();
		var positionArray = position.split(",");
		var boardSize = 14;
		for (i=0;i<(positionArray.length - 1);i++) {
			var regex = /n=./ ;
			if (regex.test(positionArray[i])) {
				var nSize = positionArray[i].split("=");
				boardSize = nSize[1];
			} else {
				var indexAndParams = positionArray[i].split("=");
				var index = indexAndParams[0];
				var params = indexAndParams[1];
				var team = params.split("")[1];
				if (team != 0) {
					if (team == "p") {
						choises.push(index);
					} else {
						if ((amIBlue && team == "b") || (!amIBlue && team == "r")) {
							choises.push(index);
							console.log("push: " + index + " " + team);
						}
					}
				}
			}
		}
		var choise = Math.floor(Math.random() * choises.length);
		var answer = choises[choise];
		console.log("randomius:" + answer);
		return answer;
	}
}

module.exports.move = move;