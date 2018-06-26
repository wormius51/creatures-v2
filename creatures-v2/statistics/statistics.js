var schema = require('./schema');

function resultCount (result) {
	schema.findOne({name: result}, function (err, doc) {
		if (doc) {
			doc.value++;
			doc.save();
		}else {
			var newStat = {name: result, value: 1};
			var data = new schema(newStat);
			data.save();
		}
	});
}

var insert = function insert (data) {
	switch (data.type) {
		case "gameResult":
			resultCount(data.value);
		break;
	}
};

var show = function show (data) {
	var value = 0;
	schema.findOne({name: data}, function (err, doc) {
		if (doc) {
			value = doc.value;
		}
	});
	
	return value;
};

module.exports.insert = insert;
module.exports.show = show;