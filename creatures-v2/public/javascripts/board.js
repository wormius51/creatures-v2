//holds the information on the game board.
var board = {
	isFliped: false,
	xpos: xpos = 10,
	ypos: ypos = 10,
	size: size = 14,
	height: height = 580,
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
				var partHeight = this.height / this.size;
				var partXpos = this.xpos + (x * partHeight);
				var partYpos = this.ypos + (y * partHeight);
				var partHorizontal;
				if (x < (this.size / 2)) {
					partHorizontal = "right";
				}else{
					partHorizontal = "left";
				}
				if (this.isFliped) {
					partYpos = this.ypos + (this.size - 1) * partHeight - y * partHeight;
					if (partVertical == "up") {
						partVertical = "down";
					}else {
						partVertical = "up";
					}
				}
				this.particals[index] = new partical(x ,y ,partHorizontal ,partVertical ,partHeight ,partXpos ,partYpos);
			}
		}
	},
	
	setPosition: function setPosition(input) {
		var position = input.split(",");
		for (i=0;i<position.length;i++) {
			if (!position[i]) {
				break;
			}
			var particalAndOrientation = new Array(2);
			particalAndOrientation = position[i].split("=");
			var index = particalAndOrientation[0];
			if (index != "n"){
				var data = particalAndOrientation[1];
				if (data) {
				var stvh = data.split("");
				var s = stvh[0];
				var t = stvh[1];
				var v = stvh[2];
				var h = stvh[3];
				
				var selected = "no";
				var team = "black";
				var vertical = "up";
				var horizontal = "left";
				
				switch (s) {
					case "y":
					selected = "yes";
					break;
					case "c":
					selected = "child";
				}
				switch (t) {
					case "b":
					team = "blue";
					break;
					case "r":
					team = "red";
					break;
					case "p":
					team = "purple";
				}
				switch (v) {
					case "u":
					vertical = "up";
					break;
					case "d":
					vertical = "down";
				}
				switch (h) {
					case "l":
					horizontal = "left";
					break;
					case "r":
					horizontal = "right";
				}
				
				var xAndY = index.split("x");
				var x = xAndY[0];
				var y = xAndY[1];
				var partHeight = this.height / this.size;
				var partXpos = this.xpos + (x * partHeight);
				var partYpos = this.ypos + (y * partHeight);
				if (this.isFliped) {
					partYpos = this.ypos + (this.size - 1) * partHeight - y * partHeight;
					if (vertical == "up") {
						vertical = "down";
					}else {
						vertical = "up";
					}
				}
				this.particals[index] = new partical(x ,y ,horizontal ,vertical ,partHeight ,partXpos ,partYpos ,selected);
				}
			}else{
				this.size = 1 * particalAndOrientation[1];
			}
		};
	},
	
	draw: function () {
		for (y=0;y<this.size;y++) {
			for (x=0;x<this.size;x++) {
				var index = x + "x" + y;
				this.particals[index].adjust();
				this.particals[index].draw();
			}
		}
	},
	
	adjust: function () {
		for (y=0;y<this.size;y++) {
			for (x=0;x<this.size;x++) {
				var index = x + "x" + y;
				if (this.isFliped) {
					if (particals[index].vertical == "up") {
						particals[index].vertical = "down";
					}else {
						particals[index].vertical = "up";
					}
				}
				this.particals[index].adjust();
			}
		}
	},
	
	end: function () {
		this.particals = [];
	}
}
