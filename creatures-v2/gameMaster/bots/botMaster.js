// sends info to a selected bot and returns its answer.
console.log("botMaster.js loaded");
var user = require('../../routes/users');

var botNames = new Array();
var bots = new Array();
botNames.push("randomius");
botNames.push("greedius");
botNames.push("nothingius");
console.log(botNames);

for (i=0;i<botNames.length;i++) {
	console.log("loop");
	var botName = botNames[i];
	bots[botName] = require('./' + botName);
	console.log(botName + " was added");
	user.findOne({userName: botName}, function (err, doc) {
		if (!doc) {
			var newUser = {userName: botName, password: "fdka;fq29ei3-fjfnca;fq"};
			var data = new user(newUser);
			data.save();
			console.log(botName + " was added to the db");
		}
	});
}

module.exports = function (botName, position, isBlueTurn, amIBlue) {
	var answer = bots[botName].move(position, isBlueTurn, amIBlue);
	return answer;
};