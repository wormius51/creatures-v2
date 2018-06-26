//controls the intire RPG app.
var map = require('./map');
var playerFactory = require('./player');

function insertPlayer (name) {
	var player = new playerFactory(name, 300, 300);
	map.tiles["9x9"].players.push(player);
}

function startMovePlayer (name, tileIndex, wasd) {
	switch (wasd) {
	
	}
}

function stopMovePlayer (name, tile, wasd) {

}

function movePlayers () {
	for (y=0;y<map.y;y++) {
		for (x=0;x<map.x;x++) {
			var index = x + "x" + y;
			map.tiles[index].movePlayers();
		}
	}
}

module.exports.insertPlayer = insertPlayer;