var botMaster = require('./bots/botMaster');
var boardFactory = require('./board');
var clockFactory = require('./clock');

var counter = -1;

//controls the progress of the game.
module.exports = function () {
	counter++
var gameMaster = {
	counter: counter,
	blueCreatures: blueCreatures = 0,
	redCreatures: redCreatures = 0,
	blueAi: blueAi = "",
	redAi: redAi = "",
	inSelection: inSelection = false,
	isBlueTurn: isBlueTurn = true,
	turnNumber: turnNumber = 0,
	PGN: PGN = "",
	position: position = "",
	isComputing: false,
	currentPosition: currentPosition = "",
	changes: changes = "",
	board: boardFactory(),
	iboard: boardFactory(),
	blueClock: clockFactory(),
	redClock: clockFactory(),
	result: "playing",
	interval: interval = 0,
	botInterval: botInterval  = 0,
	timeControll: "0:12:0+0:3",
	
	//set the gameMaster.board. for two players.
	set: function() {
		gameMaster.isComputing = true;
		gameMaster.blueCreatures = 0;
		gameMaster.redCreatures = 0;
		
		gameMaster.isBlueTurn = true;
		
		gameMaster.board.set();
		if (!gameMaster.position) {
			gameMaster.setDefultPosition();
		} else {
			gameMaster.board.setPosition(gameMaster.position);
		}
		gameMaster.iboard.size = gameMaster.board.size;
		gameMaster.iboard.set();
		var timeAndIncrament = gameMaster.timeControll.split("+");
		var timeArray = timeAndIncrament[0];
		var incramentArray = timeAndIncrament[1];
		var time = timeArray.split(":");
		var incrament = incramentArray.split(":");
		gameMaster.blueClock.hours = time[0] * 1;
		gameMaster.blueClock.minuts = time[1] * 1;
		gameMaster.blueClock.seconds = time[2] * 1;
		gameMaster.blueClock.minutsIncrament = incrament[0] * 1;
		gameMaster.blueClock.secondsIncrament = incrament[1] * 1;
		
		gameMaster.redClock.hours = time[0] * 1;
		gameMaster.redClock.minuts = time[1] * 1;
		gameMaster.redClock.seconds = time[2] * 1;
		gameMaster.redClock.minutsIncrament = incrament[0] * 1;
		gameMaster.redClock.secondsIncrament = incrament[1] * 1;
		
		//console.log(minuts + " " + seconds + " " + timeAndIncrament[0]);
		
		gameMaster.buildCreatures();
		gameMaster.updateAll();
		gameMaster.isComputing = false;
		gameMaster.interval = setInterval(gameMaster.checkTime, 100);
		if (gameMaster.blueAi != "" || gameMaster.redAi != "") {
			gameMaster.botInterval = setInterval(gameMaster.aiMove, 200);
		}
	},
	
	// adds a move to the pgn.
	addPGN: function addPGN(index, selected) {
		switch (selected) {
			case "yes":
				this.firstSelect = "";
				this.secondSelect = "";
			break;
			case "no":
				if (!this.firstSelect) {
					this.firstSelect = index;
				}
			break;
			case "child":
			if (this.firstSelect) {
				this.secondSelect = index;
				if (gameMaster.isBlueTurn) {
					gameMaster.PGN = gameMaster.PGN + "." + gameMaster.turnNumber + " " + this.firstSelect + " -> " + this.secondSelect;
				}else {
					gameMaster.PGN = gameMaster.PGN + " , " + this.firstSelect + " -> " + this.secondSelect + "<br />";
				}
				this.firstSelect = "";
			}
		}
		console.log(gameMaster.PGN);
	},
	
	setDefultPosition: function () {
		console.log("seting position");
		var n = gameMaster.board.size;
		gameMaster.board.setPosition([
			(n / 2 - 5) + "x" + 2 + "=" + "ul",
			(n / 2 - 5) + "x" + (n - 3) + "=" + "dl",
			(n / 2 + 4) + "x" + 2 + "=" + "ur",
			(n / 2 + 4) + "x" + (n - 3) + "=" + "dr",
			(n / 2 - 6) + "x" + 2 + "=" + "ur",
			(n / 2 - 6) + "x" + (n - 3) + "=" + "dr",
			(n / 2 + 5) + "x" + 2 + "=" + "ul",
			(n / 2 + 5) + "x" + (n - 3) + "=" + "dl"]
		);
	},
	
	checkTime: function () {
		var isBlueTimeUp = gameMaster.blueClock.timeUp();
		var isRedTimeUp = gameMaster.redClock.timeUp();
		if (isBlueTimeUp) {
			gameMaster.result = "red wins";
			clearInterval(gameMaster.interval);
			gameMaster.redClock.stop();
			console.log(gameMaster.result);
			clearInterval(gameMaster.botInterval);
		}
		if (isRedTimeUp) {
			gameMaster.result = "blue wins";
			clearInterval(gameMaster.interval);
			gameMaster.blueClock.stop();
			console.log(gameMaster.result);
			clearInterval(gameMaster.botInterval);
		}
	},
	
	checkEnd: function() {
		if (!gameMaster.isComputing) {
			if (gameMaster.blueCreatures < 1) {
				if (gameMaster.redCreatures < 1) {
					gameMaster.result = "draw";
				}else{
					gameMaster.result = "red wins";
				}
			}else{
				if (gameMaster.redCreatures < 1) {
					gameMaster.result = "blue wins";
				}
			}
		}
		if (gameMaster.result != "playing") {
			gameMaster.blueClock.stop();
			gameMaster.redClock.stop();
			clearInterval(gameMaster.botInterval);
		}
		console.log(gameMaster.result);
	},
	
	resign: function resign(player) {
		gameMaster.isComputing = true;
		if (player == "blue") {
			gameMaster.result = "red wins";
		}else {
			gameMaster.result = "blue wins";
		}
		clearInterval(gameMaster.botInterval);
		gameMaster.isComputing = false;
	},
	
	getPosition: function() {
		gameMaster.currentPosition = "";
		for (y=0;y<gameMaster.board.size;y++) {
			for (x=0;x<gameMaster.board.size;x++) {
				var index = x + "x" + y;
				var s = "n";
				var t = "0";
				var v = "u";
				var h = "l";
				
				switch (gameMaster.board.particals[index].selected) {
					case "no":
						s = "n";
					break;
					case "yes":
						s = "y";
					break;
					case "child":
						s = "c";
					break;
				}
				switch (gameMaster.board.particals[index].team) {
					case "blue":
						t = "b";
					break;
					case "red":
						t= "r";
					break;
					case "purple":
						t = "p";
					break;
				}
				switch (gameMaster.board.particals[index].vertical) {
					case "up":
						v = "u";
					break;
					case "down":
						v = "d";
					break;
				}
				switch (gameMaster.board.particals[index].horizontal) {
					case "left":
						h = "l";
					break;
					case "right":
						h = "r";
					break;
				}
				gameMaster.currentPosition = gameMaster.currentPosition + index + "=" + s + t + v + h + ",";
			}
		}
	},
	
	checkDraw: function () {
		gameMaster.isComputing = true;
		if (!this.repeteCount) {
			this.repeteCount = 0;
		}
		if (!this.previosPosition){
			this.previosPosition = "";
		}
		if (!this.prepreviosPosition) {
			this.prepreviosPosition = "";
		}
		if (gameMaster.changes == this.prepreviosPosition) {
			this.repeteCount++;
		} else {
			this.repeteCount = 0;
		}
		if (this.repeteCount > 2) {
			gameMaster.result = "draw";
			if (gameMaster.result != "playing") {
				gameMaster.blueClock.stop();
				gameMaster.redClock.stop();
			}
			console.log(gameMaster.result);
		}
		this.prepreviosPosition = this.previosPosition;
		this.previosPosition = gameMaster.changes;
		gameMaster.isComputing = false;
	},
	
	updateChanges: function updateChanges(index) {
		var s = "0";
		var v = "0";
		var h = "0";
		var t = "0";
		switch (gameMaster.board.particals[index].selected) {
		case "no":
			s = "n";
		break;
		case "yes":
			s = "y";
		break;
		case "child":
			s = "c";
		break;
		}
		switch (gameMaster.board.particals[index].team) {
		case "blue":
			t = "b";
		break;
		case "red":
			t= "r";
		break;
		case "purple":
			t = "p";
		break;
		}
		switch (gameMaster.board.particals[index].vertical) {
		case "up":
			v = "u";
		break;
		case "down":
			v = "d";
		break;
						}
		switch (gameMaster.board.particals[index].horizontal) {
		case "left":
			h = "l";
		break;
		case "right":
			h = "r";
		break;
		}
		var regex = /index../ ;
		if (regex.test(gameMaster.changes)) {
			gameMaster.changes.replace(regex, index + "=" + s + t + v + h);
		}else{
			gameMaster.changes = gameMaster.changes + index + "=" + s + t + v + h + ",";
		}
	},
	
	updateAll: function updateAll() {
		gameMaster.changes = "";
		for (y=0;y<gameMaster.board.size;y++){
				for (x=0;x<gameMaster.board.size;x++){
				var index = x + "x" + y;
				gameMaster.updateChanges(index);
			}
		}
	},
	
	//selects a partical that was clicked.
	select: function select(index) {
		if (gameMaster.result == "playing" && gameMaster.board.particals[index]) {
			gameMaster.isComputing = true;
			console.log("select at gameMaster: " + gameMaster.counter);
			var xselect = gameMaster.board.particals[index].x;
			var yselect = gameMaster.board.particals[index].y;
			
			if (gameMaster.board.particals[index].team == "purple" || (gameMaster.isBlueTurn && gameMaster.board.particals[index].team == "blue") || (!gameMaster.isBlueTurn && gameMaster.board.particals[index].team == "red")) {
				gameMaster.addPGN(index, gameMaster.board.particals[index].selected);
				if (gameMaster.board.particals[index].selected == "yes") {
					gameMaster.inSelection = false;
					for (y=0;y<gameMaster.board.size;y++){
						for (x=0;x<gameMaster.board.size;x++){
							var index = x + "x" + y;
							gameMaster.board.particals[index].selected = "no";
							
						}
					}
				}else{
					if (gameMaster.board.particals[index].selected == "child"){
						gameMaster.inSelection = false;
						if(gameMaster.isBlueTurn){
							gameMaster.blueClock.stop();
							gameMaster.redClock.start();
							gameMaster.isBlueTurn = false;
							console.log("red turn");
						}else{
							gameMaster.redClock.stop();
							gameMaster.blueClock.start();
							gameMaster.isBlueTurn = true;
							gameMaster.turnNumber++;
							console.log("blue turn");
						}
						for (y=0;y<gameMaster.board.size;y++){
							for (x=0;x<gameMaster.board.size;x++){
								var indexselected = x + "x" + y;
								if (gameMaster.board.particals[indexselected].selected == "yes"){
									var dx = gameMaster.board.particals[index].x - gameMaster.board.particals[indexselected].x;
									var dy = gameMaster.board.particals[index].y - gameMaster.board.particals[indexselected].y;
									
									for (y=0;y<gameMaster.board.size;y++){
										for (x=0;x<gameMaster.board.size;x++){
										var indexchild = x + "x" + y;
											if (gameMaster.board.particals[indexchild].selected == "child" || gameMaster.board.particals[indexchild].selected == "yes"){
												var copyx = x + dx;
												var copyy = y + dy;
												var indexcopy = copyx + "x" + copyy;
												if (typeof gameMaster.board.particals[indexcopy] != "undefined") {
													gameMaster.iboard.particals[indexcopy].horizontal = gameMaster.board.particals[indexchild].horizontal;
													gameMaster.iboard.particals[indexcopy].vertical = gameMaster.board.particals[indexchild].vertical;
													gameMaster.iboard.particals[indexcopy].selected = "child";
												}
												gameMaster.board.particals[indexchild].selected = "no";
												
											}
										}
									}
									
									for (y=0;y<gameMaster.board.size;y++){
										for (x=0;x<gameMaster.board.size;x++){
										var index = x + "x" + y;
											if (gameMaster.iboard.particals[index].selected == "child"){
												gameMaster.board.particals[index].horizontal = gameMaster.iboard.particals[index].horizontal;
												gameMaster.board.particals[index].vertical = gameMaster.iboard.particals[index].vertical;
												
												gameMaster.iboard.particals[index].selected = "no";
											}
										}
									}
								}
				
							}
						}
						gameMaster.buildCreatures();
						gameMaster.checkDraw();
						console.log("turnNumber: " + gameMaster.turnNumber);
						console.log("gameMaster.board. number: " + gameMaster.board.counter);
						
					}else{
						if (!gameMaster.inSelection) {
							gameMaster.board.particals[index].selected = "yes";
							
							gameMaster.inSelection = true;
							
							gameMaster.lightCreature(xselect,yselect,"vertical");
							gameMaster.lightCreature(xselect,yselect,"horizontal");
						}
					}
					
				}
				for (y=0;y<gameMaster.board.size;y++){
					for (x=0;x<gameMaster.board.size;x++){
						var index = x + "x" + y;
						gameMaster.iboard.particals[index].selected = "no";
					}
				}
		
				
			}
			gameMaster.updateAll();
			gameMaster.isComputing = false;
			gameMaster.checkEnd();
		}
		
	},
	
	//builds creatures when cores detected.
	buildCreatures: function() {
		gameMaster.blueCreatures = 0;
		gameMaster.redCreatures = 0;
		for (y=0;y<gameMaster.board.size;y++) {
			for (x=0;x<gameMaster.board.size;x++) {
				var index = x + "x" + y;
				gameMaster.board.particals[index].team = "black";
				gameMaster.updateChanges(index);
			}
		}
		
		for (y=0;y<gameMaster.board.size;y++) {
			for (x=0;x<gameMaster.board.size;x++) {
				var index = x + "x" + y;
				var indexb = x + "x" + (y-1);
				var indexc = (x+1) + "x" + (y-1);
				var indexd = (x+1) + "x" + y;
				if (typeof gameMaster.board.particals[index] != "undefined" && typeof gameMaster.board.particals[indexb] != "undefined" && typeof gameMaster.board.particals[indexc] != "undefined" && typeof gameMaster.board.particals[indexd] != "undefined") {
				
					if (gameMaster.board.particals[index].horizontal == "right" && gameMaster.board.particals[index].vertical == "up" && gameMaster.board.particals[indexb].horizontal == "right" && gameMaster.board.particals[indexb].vertical == "down" && gameMaster.board.particals[indexc].horizontal == "left" && gameMaster.board.particals[indexc].vertical == "down" && gameMaster.board.particals[indexd].horizontal == "right" && gameMaster.board.particals[indexd].vertical == "up") {
						gameMaster.blueCreatures++;
						
						if(gameMaster.board.particals[index].team == "red"){
						gameMaster.board.particals[index].team = "purple";
						//gameMaster.updateChanges(index);
						}else{
							gameMaster.board.particals[index].team = "blue";
							//gameMaster.updateChanges(index);
						}
						gameMaster.equlizeTeam(x,y,"vertical");
						gameMaster.equlizeTeam(x,y,"horizontal");
					}
					
					if (gameMaster.board.particals[index].horizontal == "left" && gameMaster.board.particals[index].vertical == "up" && gameMaster.board.particals[indexb].horizontal == "right" && gameMaster.board.particals[indexb].vertical == "down" && gameMaster.board.particals[indexc].horizontal == "left" && gameMaster.board.particals[indexc].vertical == "down" && gameMaster.board.particals[indexd].horizontal == "left" && gameMaster.board.particals[indexd].vertical == "up") {
						gameMaster.blueCreatures++;
						
						if(gameMaster.board.particals[index].team == "red"){
						gameMaster.board.particals[index].team = "purple";
						//gameMaster.updateChanges(index);
						}else{
							gameMaster.board.particals[index].team = "blue";
							//gameMaster.updateChanges(index);
						}
						gameMaster.equlizeTeam(x,y,"vertical");
						gameMaster.equlizeTeam(x,y,"horizontal");
					}
					
					if (gameMaster.board.particals[index].horizontal == "right" && gameMaster.board.particals[index].vertical == "up" && gameMaster.board.particals[indexb].horizontal == "right" && gameMaster.board.particals[indexb].vertical == "down" && gameMaster.board.particals[indexc].horizontal == "right" && gameMaster.board.particals[indexc].vertical == "down" && gameMaster.board.particals[indexd].horizontal == "left" && gameMaster.board.particals[indexd].vertical == "up") {
						gameMaster.redCreatures++;
						
						if(gameMaster.board.particals[index].team == "blue"){
						gameMaster.board.particals[index].team = "purple";
						//gameMaster.updateChanges(index);
						}else{
							gameMaster.board.particals[index].team = "red";
							//gameMaster.updateChanges(index);
						}
						gameMaster.equlizeTeam(x,y,"vertical");
						gameMaster.equlizeTeam(x,y,"horizontal");
					}
					
					if (gameMaster.board.particals[index].horizontal == "right" && gameMaster.board.particals[index].vertical == "up" && gameMaster.board.particals[indexb].horizontal == "left" && gameMaster.board.particals[indexb].vertical == "down" && gameMaster.board.particals[indexc].horizontal == "left" && gameMaster.board.particals[indexc].vertical == "down" && gameMaster.board.particals[indexd].horizontal == "left" && gameMaster.board.particals[indexd].vertical == "up") {
						gameMaster.redCreatures++;
						
						if(gameMaster.board.particals[index].team == "blue"){
						gameMaster.board.particals[index].team = "purple";
						//gameMaster.updateChanges(index);
						}else{
							gameMaster.board.particals[index].team = "red";
							//gameMaster.updateChanges(index);
						}
						gameMaster.equlizeTeam(x,y,"vertical");
						gameMaster.equlizeTeam(x,y,"horizontal");
					}
				}
			}
		}
		
	},
//equlizes the team across the creature.	
	equlizeTeam: function equlizeTeam(x,y,vh) {
		var index = x + "x" + y;
		var indexnext = index;
		if (vh == "horizontal"){
			if (typeof gameMaster.board.particals[indexnext] != "undefined" && gameMaster.board.particals[index].horizontal == "right"){
				x++;
				indexnext = x + "x" + y;
				if (typeof gameMaster.board.particals[indexnext] != "undefined" && gameMaster.board.particals[indexnext].horizontal == "left"){
					gameMaster.board.particals[indexnext].team = gameMaster.board.particals[index].team;
					//gameMaster.updateChanges(indexnext);
					gameMaster.equlizeTeam(x,y,"vertical");
				}
			}else{
				x--;
				indexnext = x + "x" + y;
				if (typeof gameMaster.board.particals[indexnext] != "undefined" && gameMaster.board.particals[indexnext].horizontal == "right"){
					gameMaster.board.particals[indexnext].team = gameMaster.board.particals[index].team;
					//gameMaster.updateChanges(indexnext);
					gameMaster.equlizeTeam(x,y,"vertical");
				}
			}
		}else{
			if (typeof gameMaster.board.particals[indexnext] != "undefined" && gameMaster.board.particals[indexnext].vertical == "down"){
				y++;
				indexnext = x + "x" + y;
				if (typeof gameMaster.board.particals[indexnext] != "undefined" && gameMaster.board.particals[indexnext].vertical == "up"){
					gameMaster.board.particals[indexnext].team = gameMaster.board.particals[index].team;
					//gameMaster.updateChanges(indexnext);
					gameMaster.equlizeTeam(x,y,"horizontal");
				}
			}else{
				y--;
				indexnext = x + "x" + y;
				if (typeof gameMaster.board.particals[indexnext] != "undefined" && gameMaster.board.particals[indexnext].vertical == "down"){
					gameMaster.board.particals[indexnext].team = gameMaster.board.particals[index].team;
					//gameMaster.updateChanges(indexnext);
					gameMaster.equlizeTeam(x,y,"horizontal");
				}
			}
		}
	},
	
	lightCreature: function lightCreature(x,y,vh) {
		var index = x + "x" + y;
		var indexnext = index;
		
		if (vh == "horizontal"){
			if (typeof gameMaster.board.particals[index] != "undefined" && gameMaster.board.particals[index].horizontal == "right"){
				x++;
				indexnext = x + "x" + y;
				
				if (typeof gameMaster.board.particals[indexnext] != "undefined" && gameMaster.board.particals[indexnext].horizontal == "left"){
					gameMaster.board.particals[indexnext].selected = "child"
					//gameMaster.updateChanges(indexnext);
					gameMaster.lightCreature(x,y,"vertical");
				}
			}else{
				x--;
				indexnext = x + "x" + y;
				
				if (typeof gameMaster.board.particals[indexnext] != "undefined" && gameMaster.board.particals[indexnext].horizontal == "right"){
					gameMaster.board.particals[indexnext].selected = "child";
					//gameMaster.updateChanges(indexnext);
					gameMaster.lightCreature(x,y,"vertical");
				}
			}
		}else{
			if (typeof gameMaster.board.particals[indexnext] != "undefined" && gameMaster.board.particals[indexnext].vertical == "down"){
				y++;
				indexnext = x + "x" + y;
				
				if (typeof gameMaster.board.particals[indexnext] != "undefined" && gameMaster.board.particals[indexnext].vertical == "up"){
					gameMaster.board.particals[indexnext].selected = "child";
					//gameMaster.updateChanges(indexnext);
					gameMaster.lightCreature(x,y,"horizontal");
				}
			}else{
				y--;
				indexnext = x + "x" + y;
				
				if (typeof gameMaster.board.particals[indexnext] != "undefined" && gameMaster.board.particals[indexnext].vertical == "down"){
					gameMaster.board.particals[indexnext].selected = "child";
					//gameMaster.updateChanges(indexnext);
					gameMaster.lightCreature(x,y,"horizontal");
				}
			}
		}
	},
	
	aiMove: function () {
		gameMaster.isComputing = true;
		console.log("ai check if move");
		if (gameMaster.blueAi != "") {
			gameMaster.getPosition();
			var answer = botMaster(gameMaster.blueAi, gameMaster.currentPosition, gameMaster.isBlueTurn, true);
			console.log("bot answer: " + answer);
			if (answer != "not my turn") {
				gameMaster.select(answer);
			}
		}
		if (gameMaster.redAi != "") {
			gameMaster.getPosition();
			var answer = botMaster(gameMaster.redAi, gameMaster.currentPosition, gameMaster.isBlueTurn, false);
			console.log("bot answer: " + answer);
			if (answer != "not my turn") {
				gameMaster.select(answer);
			}
		}
		gameMaster.isComputing = false;
	}
};
console.log("blueAi: " + gameMaster.blueAi);
console.log("redAi: " + gameMaster.redAi);
//gameMaster.aiMove();
return gameMaster;
};

/*if (gameMaster.blueAi != "" && isBlueTurn) {
							gameMaster.getPosition();
							var answer = botMaster(gameMaster.blueAi, gameMaster.currentPosition, gameMaster.isBlueTurn, true);
							console.log("bot answer: " + answer);
							gameMaster.select(answer);
						}
						if (gameMaster.redAi != "" && !isBlueTurn) {
							gameMaster.getPosition();
							var answer = botMaster(gameMaster.redAi, gameMaster.currentPosition, gameMaster.isBlueTurn, false);
							console.log("bot answer: " + answer);
							gameMaster.select(answer);
						}*/