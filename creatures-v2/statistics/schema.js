var mongoose = require('mongoose');

var schema = mongoose.Schema;

var statSchema = new schema ({
	name: {type: String, unique: true, dropDups: true, required: true},
	value: {type: Number, default: 0}
});

var stat = mongoose.model('stat', statSchema);
module.exports = stat;