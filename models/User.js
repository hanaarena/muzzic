var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	name: { type: String, unique: true, required: true },
	avatar: { type: String },
	favorSong: [{ type: String }],
	favorPlaylist: [{ type: String }]
});

module.exports = mongoose.model('User', userSchema);
