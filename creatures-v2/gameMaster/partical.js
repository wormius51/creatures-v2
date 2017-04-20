//particals constructor only for calculation.
module.exports = function partical (x ,y ,horizontal ,vertical) {
	this.x = x;
	this.y = y;
	this.index = x + "x" + y;
	this.horizontal = horizontal;
	this.vertical = vertical;
	this.team = "black";
	this.selected = "no";
};