const mongoose = require('mongoose');

const gamesSchema = mongoose.Schema({
  player1: { type: String, required: true },
  player2: { type: Number, required: true },
  timer: { type: Number, required: true }
});

module.exports = mongoose.model('Game', gamesSchema);
