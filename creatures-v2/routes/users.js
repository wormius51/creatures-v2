var mongoose = require('mongoose');
mongoose.connect('localhost:27017/users');
console.log("mongoose loaded");
//template for useres.
var schema = mongoose.Schema;
var userSchema = new schema({
	userName: {type: String, unique: true, dropDups: true, required: true},
	password: {type: String, required: true},
	rating: {type: Number, default: 1200}
});

var user = mongoose.model('user', userSchema);
module.exports = user;
