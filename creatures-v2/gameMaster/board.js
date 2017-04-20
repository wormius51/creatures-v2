var partical = require('./partical');
var counter = -1;
//holds the information on the game board.
module.exports = function () {
	counter++;
	console.log("creating board number: " + counter);
return {
	counter: counter,
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

};
