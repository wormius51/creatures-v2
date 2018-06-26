//the map of the world.
//tiles are areas in the map that load seperatly.
var tileFactory = require('./tile');

map = {
	tiles: tiles = new Array(),
	x: 20,
	y: 20,
	
	set: function () {
		for (y=0;y<map.y;y++) {
			for (x=0;x<map.x;x++) {
				var index = x + "x" + y;
				map.tiles[index] = new tileFactory();
			}
		}
	},
};

module.exports = map;