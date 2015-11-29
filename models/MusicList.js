var mongoose = require('mongoose');

var musicListSchema = new mongoose.Schema({
  isActive: {type: Boolean, default: false},
  value: {type: Number, unique: true, required: true},
  url: {type: String, default: ''}

});

module.exports = mongoose.model('MusicList', musicListSchema);
