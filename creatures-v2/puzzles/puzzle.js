// constructor of puzzles.
//1 move puzzles for now.
module.exports = function (position, solution, description, endComment) {
	this.position = position;
	this.solution = solution;
	this.description = description;
	this.endComment = endComment;
};