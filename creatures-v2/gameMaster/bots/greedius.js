// a bot that makes greedy moves.
var boardFactory = require('../board');
var board = boardFactory();
var iboard = boardFactory();
var positionArray;
function move (position, isBlueTurn, amIBlue) {
	if ((isBlueTurn && !amIBlue) || (!isBlueTurn && amIBlue)) {
		return "not my turn";
	} else {
		
		var choises = new Array();
		positionArray = position.split(",");
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
						}
					}
				}
			}
		}
		
		board.size = boardSize;
		board.set();
		board.setPosition(positionArray);
		
		
		iboard.size = boardSize;
		iboard.set();
		iboard.setPosition(positionArray);
		
		var maxEvaluation;
		var choice;
		
		puzzleMaster.children = [];
		console.log("number of choises: " + choises.length);
		
		for (i=0;i<choises.length;i++) {
			var moveAndevaluation = checkBest(choises[i], amIBlue);
			
			if (!maxEvaluation || ((amIBlue && evaluation > maxEvaluation) || (!amIBlue && evaluation < maxEvaluation))) {
				maxEvaluation = moveAndevaluation.evaluation;
				choise = moveAndevaluation.move;
			}
		}
		console.log("maxEvaluation: " + maxEvaluation);
		
		return choice;
	}
}

puzzleMaster = {
	blueCreatures: 0,
	redCreatures: 0,
	firstSelect: "",
	secondSelect: "",
	select: function select(index) {
		if (true) {
			switch (board.particals[index].selected) {
				case "yes":
					console.log("select cancle: " + index);
					board.particals[index].selected = "no";
					for (y=0;y<board.size;y++) {
						for (x=0;x<board.size;x++) {
							var index = x + "x" + y;
							if (board.particals[index] && board.particals[index].selected == "child") {
								board.particals[index].selected = "no";
							}
						}
					}
				break;
				
				case "no":
					console.log("first select: " + index);
					puzzleMaster.firstSelect = index;
					board.particals[index].selected = "yes";
					var x = index.split("x")[0];
					var y = index.split("x")[1];
					puzzleMaster.lightCreature(x,y,"horizontal");
					puzzleMaster.lightCreature(x,y,"vertical");
				break;
				
				case "child":
					console.log("second select: " + index);
					puzzleMaster.secondSelect = index;
					for (y=0;y<board.size;y++){
							for (x=0;x<board.size;x++){
								var indexselected = x + "x" + y;
								if (board.particals[indexselected].selected == "yes"){
									var dx = board.particals[index].x - board.particals[indexselected].x;
									var dy = board.particals[index].y - board.particals[indexselected].y;
									
									for (y=0;y<board.size;y++){
										for (x=0;x<board.size;x++){
										var indexchild = x + "x" + y;
											if (board.particals[indexchild].selected == "child" || board.particals[indexchild].selected == "yes"){
												var copyx = x + dx;
												var copyy = y + dy;
												var indexcopy = copyx + "x" + copyy;
												if (typeof board.particals[indexcopy] != "undefined") {
													iboard.particals[indexcopy].horizontal = board.particals[indexchild].horizontal;
													iboard.particals[indexcopy].vertical = board.particals[indexchild].vertical;
													iboard.particals[indexcopy].selected = "child";
												}
												board.particals[indexchild].selected = "no";
											}
										}
									}
									
									for (y=0;y<board.size;y++){
										for (x=0;x<board.size;x++){
										var index = x + "x" + y;
											if (iboard.particals[index].selected == "child"){
												board.particals[index].horizontal = iboard.particals[index].horizontal;
												board.particals[index].vertical = iboard.particals[index].vertical;
												iboard.particals[index].selected = "no";
											}
										}
									}
								}
				
							}
						}
				break;
			}
		}
		puzzleMaster.buildCreatures();
	},
	children: new Array(),
	lightCreature: function lightCreature(x,y,vh) {
		
		var index = x + "x" + y;
		var indexnext = index;
		console.log("lightCreature");
		if (vh == "horizontal"){
			if (typeof board.particals[index] != "undefined" && board.particals[index].horizontal == "right"){
				x++;
				indexnext = x + "x" + y;
				
				if (typeof board.particals[indexnext] != "undefined" && board.particals[indexnext].horizontal == "left"){
					board.particals[indexnext].selected = "child";
					puzzleMaster.children.push(x + "x" + y);
					puzzleMaster.lightCreature(x,y,"vertical");
				}
			}else{
				x--;
				indexnext = x + "x" + y;
				
				if (typeof board.particals[indexnext] != "undefined" && board.particals[indexnext].horizontal == "right"){
					board.particals[indexnext].selected = "child";
					puzzleMaster.children.push(x + "x" + y);
					puzzleMaster.lightCreature(x,y,"vertical");
				}
			}
		}else{
			if (typeof board.particals[indexnext] != "undefined" && board.particals[indexnext].vertical == "down"){
				y++;
				indexnext = x + "x" + y;
				
				if (typeof board.particals[indexnext] != "undefined" && board.particals[indexnext].vertical == "up"){
					board.particals[indexnext].selected = "child";
					puzzleMaster.children.push(x + "x" + y);
					puzzleMaster.lightCreature(x,y,"horizontal");
				}
			}else{
				y--;
				indexnext = x + "x" + y;
				
				if (typeof board.particals[indexnext] != "undefined" && board.particals[indexnext].vertical == "down"){
					board.particals[indexnext].selected = "child";
					puzzleMaster.children.push(x + "x" + y);
					puzzleMaster.lightCreature(x,y,"horizontal");
				}
			}
		}
	},
	
	buildCreatures: function() {
		puzzleMaster.blueCreatures = 0;
		puzzleMaster.redCreatures = 0;
		for (y=0;y<board.size;y++) {
			for (x=0;x<board.size;x++) {
				var index = x + "x" + y;
				board.particals[index].team = "black";
			}
		}
		
		for (y=0;y<board.size;y++) {
			for (x=0;x<board.size;x++) {
				var index = x + "x" + y;
				var indexb = x + "x" + (y-1);
				var indexc = (x+1) + "x" + (y-1);
				var indexd = (x+1) + "x" + y;
				if (typeof board.particals[index] != "undefined" && typeof board.particals[indexb] != "undefined" && typeof board.particals[indexc] != "undefined" && typeof board.particals[indexd] != "undefined") {
				
					if (board.particals[index].horizontal == "right" && board.particals[index].vertical == "up" && board.particals[indexb].horizontal == "right" && board.particals[indexb].vertical == "down" && board.particals[indexc].horizontal == "left" && board.particals[indexc].vertical == "down" && board.particals[indexd].horizontal == "right" && board.particals[indexd].vertical == "up") {
						puzzleMaster.blueCreatures++;
						
						if(board.particals[index].team == "red"){
						board.particals[index].team = "purple";
						}else{
							board.particals[index].team = "blue";
						}
						puzzleMaster.equlizeTeam(x,y,"vertical");
						puzzleMaster.equlizeTeam(x,y,"horizontal");
					}
					
					if (board.particals[index].horizontal == "left" && board.particals[index].vertical == "up" && board.particals[indexb].horizontal == "right" && board.particals[indexb].vertical == "down" && board.particals[indexc].horizontal == "left" && board.particals[indexc].vertical == "down" && board.particals[indexd].horizontal == "left" && board.particals[indexd].vertical == "up") {
						puzzleMaster.blueCreatures++;
						
						if(board.particals[index].team == "red"){
						board.particals[index].team = "purple";
						}else{
							board.particals[index].team = "blue";
						}
						puzzleMaster.equlizeTeam(x,y,"vertical");
						puzzleMaster.equlizeTeam(x,y,"horizontal");
					}
					
					if (board.particals[index].horizontal == "right" && board.particals[index].vertical == "up" && board.particals[indexb].horizontal == "right" && board.particals[indexb].vertical == "down" && board.particals[indexc].horizontal == "right" && board.particals[indexc].vertical == "down" && board.particals[indexd].horizontal == "left" && board.particals[indexd].vertical == "up") {
						puzzleMaster.redCreatures++;
						
						if(board.particals[index].team == "blue"){
						board.particals[index].team = "purple";
						}else{
							board.particals[index].team = "red";
						}
						puzzleMaster.equlizeTeam(x,y,"vertical");
						puzzleMaster.equlizeTeam(x,y,"horizontal");
					}
					
					if (board.particals[index].horizontal == "right" && board.particals[index].vertical == "up" && board.particals[indexb].horizontal == "left" && board.particals[indexb].vertical == "down" && board.particals[indexc].horizontal == "left" && board.particals[indexc].vertical == "down" && board.particals[indexd].horizontal == "left" && board.particals[indexd].vertical == "up") {
						puzzleMaster.redCreatures++;
						
						if(board.particals[index].team == "blue"){
						board.particals[index].team = "purple";
						}else{
							board.particals[index].team = "red";
						}
						puzzleMaster.equlizeTeam(x,y,"vertical");
						puzzleMaster.equlizeTeam(x,y,"horizontal");
					}
				}
			}
		}
		
	},
	
	equlizeTeam: function equlizeTeam(x,y,vh) {
		var index = x + "x" + y;
		var indexnext = index;
		if (vh == "horizontal"){
			if (typeof board.particals[indexnext] != "undefined" && board.particals[index].horizontal == "right"){
				x++;
				indexnext = x + "x" + y;
				if (typeof board.particals[indexnext] != "undefined" && board.particals[indexnext].horizontal == "left"){
					board.particals[indexnext].team = board.particals[index].team;
					puzzleMaster.equlizeTeam(x,y,"vertical");
				}
			}else{
				x--;
				indexnext = x + "x" + y;
				if (typeof board.particals[indexnext] != "undefined" && board.particals[indexnext].horizontal == "right"){
					board.particals[indexnext].team = board.particals[index].team;
					puzzleMaster.equlizeTeam(x,y,"vertical");
				}
			}
		}else{
			if (typeof board.particals[indexnext] != "undefined" && board.particals[indexnext].vertical == "down"){
				y++;
				indexnext = x + "x" + y;
				if (typeof board.particals[indexnext] != "undefined" && board.particals[indexnext].vertical == "up"){
					board.particals[indexnext].team = board.particals[index].team;
					puzzleMaster.equlizeTeam(x,y,"horizontal");
				}
			}else{
				y--;
				indexnext = x + "x" + y;
				if (typeof board.particals[indexnext] != "undefined" && board.particals[indexnext].vertical == "down"){
					board.particals[indexnext].team = board.particals[index].team;
					puzzleMaster.equlizeTeam(x,y,"horizontal");
				}
			}
		}
	},
};

function checkBest(index, amIBlue) {
	console.log("checking " + index);
	puzzleMaster.children = [];
	puzzleMaster.select(index);
	var maxEvaluation;
	var choice;
	console.log("puzzleMaster.children: " + puzzleMaster.children);
	for (i=0;i<puzzleMaster.children.length;i++) {
		var child = puzzleMaster.children[i];
		console.log("child: " + child);
		puzzleMaster.select(child);
		var evaluation = Evaluation();
		if (!maxEvaluation || ((amIBlue && evaluation > maxEvaluation) || (!amIBlue && evaluation < maxEvaluation))) {
			maxEvaluation = evaluation;
			choise = index + "->" + child;
		}
		
		board.setPosition(positionArray);
	}
	
	
	return {choice: choice, evaluation: maxEvaluation};
}

function Evaluation() {
	console.log("evaloation: " + puzzleMaster.blueCreatures - puzzleMaster.redCreatures);
	return puzzleMaster.blueCreatures - puzzleMaster.redCreatures;
}

module.exports.move = move;