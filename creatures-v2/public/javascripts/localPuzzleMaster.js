puzzleMaster = {
	blueCreatures: 0,
	redCreatures: 0,
	isSelect: false,
	select: function select(index) {
		if (board.particals[index].team == "blue" || board.particals[index].team == "purple") {
			switch (board.particals[index].selected) {
				case "yes":
					puzzleMaster.isSelect = false;
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
					if (!puzzleMaster.isSelect) {
						puzzleMaster.isSelect = true;
						firstSelect = index;
						board.particals[index].selected = "yes";
						var x = index.split("x")[0];
						var y = index.split("x")[1];
						puzzleMaster.lightCreature(x,y,"horizontal");
						puzzleMaster.lightCreature(x,y,"vertical");
					}
					
				break;
				
				case "child":
					puzzleMaster.isSelect = false;
					secondSelect = index;
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
		board.adjust();
		checkSolved();
	},
	
	lightCreature: function lightCreature(x,y,vh) {
		var index = x + "x" + y;
		var indexnext = index;
		
		if (vh == "horizontal"){
			if (typeof board.particals[index] != "undefined" && board.particals[index].horizontal == "right"){
				x++;
				indexnext = x + "x" + y;
				
				if (typeof board.particals[indexnext] != "undefined" && board.particals[indexnext].horizontal == "left"){
					board.particals[indexnext].selected = "child"
					puzzleMaster.lightCreature(x,y,"vertical");
				}
			}else{
				x--;
				indexnext = x + "x" + y;
				
				if (typeof board.particals[indexnext] != "undefined" && board.particals[indexnext].horizontal == "right"){
					board.particals[indexnext].selected = "child";
					puzzleMaster.lightCreature(x,y,"vertical");
				}
			}
		}else{
			if (typeof board.particals[indexnext] != "undefined" && board.particals[indexnext].vertical == "down"){
				y++;
				indexnext = x + "x" + y;
				
				if (typeof board.particals[indexnext] != "undefined" && board.particals[indexnext].vertical == "up"){
					board.particals[indexnext].selected = "child";
					puzzleMaster.lightCreature(x,y,"horizontal");
				}
			}else{
				y--;
				indexnext = x + "x" + y;
				
				if (typeof board.particals[indexnext] != "undefined" && board.particals[indexnext].vertical == "down"){
					board.particals[indexnext].selected = "child";
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

for (y=0;y<board.size;y++) {
	for (x=0;x<board.size;x++) {
		var index = x + "x" + y;
		board.particals[index].picture.onclick = function () {
			puzzleMaster.select(this.id);
		};
		board.particals[index].picture.ondragstart = function () {
			puzzleMaster.select(this.id);
			return false;
		};
	}
}
var iboard = {
	size: size = 14,
	particals: particals = new Array(),
	set: function () {
		for (y=0;y<this.size;y++) {
			var partVertical;
			if (y < (this.size / 2) ) {
				partVertical = "down";
			}else{
				partVertical = "up";
			}
			for (x=0;x<this.size;x++) {
				var index = x + "x" + y;
				var partHorizontal;
				if (x < (this.size / 2)) {
					partHorizontal = "right";
				}else{
					partHorizontal = "left";
				}
				
				this.particals[index] = new partical(x ,y ,partHorizontal ,partVertical);
			}
		}
	},
	
	setPosition: function setPosition(position) {
		for (i=0;i<position.length;i++) {
			var particalAndOrientation = new Array(2);
			particalAndOrientation = position[i].split("=");
			var index = particalAndOrientation[0];
			if (this.particals[index]) {
					var orientation = particalAndOrientation[1];
					var verticalHorizontal = new Array(2);
					verticalHorizontal = orientation.split("");
					var vertical = verticalHorizontal[0];
					var horizontal = verticalHorizontal[1];
					
					if (vertical == "u") {
						vertical = "up";
					}else{
						vertical = "down";
					}
					
					if (horizontal == "r") {
						horizontal = "right";
					}else{
						horizontal = "left";
					}
					
					this.particals[index].vertical = vertical;
					this.particals[index].horizontal = horizontal;
			}
		};
	},
	
	getPosition: function () {
		console.log(this.particals);
		return this.particals;
	},
	
	end: function () {
		this.particals = [];
	}
};

iboard.size = board.size;
iboard.set();
iboard.setPosition(positionArray);