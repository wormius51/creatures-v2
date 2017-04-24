var gameMaster = require('../../gameMaster/gameMaster');
var userUpdate = require('../../routes/userUpdate');
//constructor function for game rooms.
function gameRoom(creator, creatorRating, boardSize, timeControll) {
	this.creator = creator;
	this.creatorRating = creatorRating;
	this.boardSize = boardSize;
	this.timeControll = timeControll;
	this.visitor = "";
	this.visitorRating = 0;
	this.state = "waiting";
	this.endHandled = false;
	this.bluePlayer = "";
	this.bluePlayerRating = 0;
	this.redPlayer = "";
	this.redPlayerRating = 0;
	this.gameMaster = gameMaster();
	this.gameMaster.timeControll = timeControll;
	this.gameMaster.board.size = this.boardSize;
}

var gameRooms = new Array();
var display = new Array();
var counter = -1;

//insert a new game room.
function insert(creator, creatorRating, boardSize, timeControll) {
	counter++;
	var gr = new gameRoom(creator, creatorRating, boardSize, timeControll);
	gameRooms.push(gr);
	display.push(creator + " " + creatorRating + " " + boardSize + " " + timeControll + ",waiting," + counter);
}
//join the game.
function join(visitor, visitorRating, index) {
	var gr = gameRooms[index];
	gr.visitor = visitor;
	gr.visitorRating = visitorRating;
	var r = Math.random() * 2;
	if(r < 1) {
		gr.bluePlayer = gr.creator;
		gr.bluePlayerRating = gr.creatorRating;
		gr.redPlayer = gr.visitor;
		gr.redPlayerRating = gr.visitorRating;
	}else{
		gr.redPlayer = gr.creator;
		gr.redPlayerRating = gr.creatorRating;
		gr.bluePlayer = gr.visitor;
		gr.bluePlayerRating = gr.visitorRating;
	}
	console.log(gr.bluePlayer + " " + gr.bluePlayerRating + " " + gr.redPlayer + " " + gr.redPlayerRating);
	gr.gameMaster.set();
	gr.state = "playing";
	var displayIndex = 0;
	for (i=0;i<display.length;i++) {
		var roomIndex = display[i].split(",")[2];
		if (roomIndex == index) {
			displayIndex = i;
			break;
		}
	}
	display[displayIndex] = gr.bluePlayer + " vs " + gr.redPlayer + ",playing," + index;
}

function end(index) {
	var gr = gameRooms[index];
	if (gr.bluePlayer != gr.redPlayer && gr.state == "playing") {
		userUpdate.ratingChange(gr.bluePlayer, gr.bluePlayerRating, gr.redPlayer, gr.redPlayerRating, gr.gameMaster.result);
	}
	gr.state = "done";
	gr.endHandled = true;
	//display[index] = gr.bluePlayer + " vs " + gr.redPlayer + ",done," + index;
	display.splice(index,1);
}

function checkIfDone (index) {
	var gr = gameRooms[index];
	if (gr.gameMaster.result != "playing" && !gr.endHandled) {
		end(index);
		console.log('game ' + index + ' done');
	}
}

function select(roomIndex, name, particalIndex) {
	var gr = gameRooms[roomIndex];
	if ((name == gr.bluePlayer && gr.gameMaster.isBlueTurn) || (name == gr.redPlayer && !gr.gameMaster.isBlueTurn)) {
		gr.gameMaster.select(particalIndex);
		console.log(name + "'s select request was accepted. " + particalIndex);
	}else {
		console.log(name + "'s select request was rejected.");
	}
	checkIfDone(roomIndex);
}

module.exports.select = select;
module.exports.insert = insert;
module.exports.rooms = gameRooms;
module.exports.display = display;
module.exports.join = join;
module.exports.checkIfDone = checkIfDone;