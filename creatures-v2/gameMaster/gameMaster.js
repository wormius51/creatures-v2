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
	blueAi: blueAi = false,
	redAi: redAi = false,
	inSelection: inSelection = false,
	isBlueTurn: isBlueTurn = true,
	turnNumber: turnNumber = 0,
	PGN: PGN = "",
	position: position = new Array("n=14","2x1=ul","2x12=dl","11x1=ur","11x12=dr","1x1=ur","1x12=dr","12x1=ul","12x12=dl"),
	isComputing: false,
	currentPosition: currentPosition = "",
	changes: changes = "",
	board: boardFactory(),
	iboard: boardFactory(),
	blueClock: clockFactory(),
	redClock: clockFactory(),
	result: "playing",
	interval: interval = 0,
	timeControll: "0:12:0+0:3",
	
	//set the gameMaster.board. for two players.
	set: function() {
		gameMaster.isComputing = true;
		gameMaster.blueCreatures = 0;
		gameMaster.redCreatures = 0;
		
		gameMaster.isBlueTurn = true;
		
		gameMaster.board.set();
		gameMaster.setDefultPosition();
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
	},
	// adds a move to the pgn.
	addPGN: function addPGN(index, selected) {
		switch (selected) {
			case "yes":
				this.firstSelect = "";
				this.secondSelect = "";
			break;
			case "no":
				this.firstSelect = index;
			break;
			case "child":
			if (this.firstSelect) {
				this.secondSelect = index;
				if (gameMaster.isBlueTurn) {
					gameMaster.PGN = gameMaster.PGN + "." + gameMaster.turnNumber + " " + this.firstSelect + " -> " + this.secondSelect;
				}else {
					gameMaster.PGN = gameMaster.PGN + " , " + this.firstSelect + " -> " + this.secondSelect + "<br />";
				}
			}
		}
		console.log(gameMaster.PGN);
	},
	
	setDefultPosition: function () {
		console.log("seting position");
		var n = gameMaster.board.size;
		gameMaster.board.setPosition([
			(n / 2 - 5) + "x" + 1 + "=" + "ul",
			(n / 2 - 5) + "x" + (n - 2) + "=" + "dl",
			(n / 2 + 4) + "x" + 1 + "=" + "ur",
			(n / 2 + 4) + "x" + (n - 2) + "=" + "dr",
			(n / 2 - 6) + "x" + 1 + "=" + "ur",
			(n / 2 - 6) + "x" + (n - 2) + "=" + "dr",
			(n / 2 + 5) + "x" + 1 + "=" + "ul",
			(n / 2 + 5) + "x" + (n - 2) + "=" + "dl"]
		);
		//gameMaster.board.setPosition(gameMaster.position);
	},
	
	checkTime: function () {
		var isBlueTimeUp = gameMaster.blueClock.timeUp();
		var isRedTimeUp = gameMaster.redClock.timeUp();
		if (isBlueTimeUp) {
			gameMaster.result = "red wins";
			clearInterval(gameMaster.interval);
			gameMaster.redClock.stop();
			console.log(gameMaster.result);
		}
		if (isRedTimeUp) {
			gameMaster.result = "blue wins";
			clearInterval(gameMaster.interval);
			gameMaster.blueClock.stop();
			console.log(gameMaster.result);
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
		gameMaster.isComputing = false;
	},
	
	getPosition: function() {
		currentPosition = "";
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
		if (gameMaster.result == "playing") {
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
							//gameMaster.updateChanges(index);
						}
					}
				}else{
					if (gameMaster.board.particals[index].selected == "child"){
						gameMaster.inSelection = false;
						if(gameMaster.isBlueTurn){
							gameMaster.blueClock.stop();
							gameMaster.redClock.start();
							gameMaster.isBlueTurn = false;
						}else{
							gameMaster.redClock.stop();
							gameMaster.blueClock.start();
							gameMaster.isBlueTurn = true;
							gameMaster.turnNumber++;
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
												//gameMaster.updateChanges(indexchild);
											}
										}
									}
									
									for (y=0;y<gameMaster.board.size;y++){
										for (x=0;x<gameMaster.board.size;x++){
										var index = x + "x" + y;
											if (gameMaster.iboard.particals[index].selected == "child"){
												gameMaster.board.particals[index].horizontal = gameMaster.iboard.particals[index].horizontal;
												gameMaster.board.particals[index].vertical = gameMaster.iboard.particals[index].vertical;
												//gameMaster.updateChanges(indexchild);
												gameMaster.iboard.particals[index].selected = "no";
											}
										}
									}
								}
				
							}
						}
						gameMaster.buildCreatures();
						
						console.log("turnNumber: " + gameMaster.turnNumber);
						console.log("gameMaster.board. number: " + gameMaster.board.counter);
					}else{
						if (!gameMaster.inSelection) {
							gameMaster.board.particals[index].selected = "yes";
							//gameMaster.updateChanges(index);
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
};
return gameMaster;
};