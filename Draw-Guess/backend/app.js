var express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Game = require('./models/games');
const app = express();

mongoose.connect('mongodb+srv://idan:vMAmHc1IhFybxLQi@cluster0-xek2l.mongodb.net/node-angular?retryWrites=true'
).then(() => {
  console.log("Connected to database!");
})
.catch(() => {
  console.log("Connection failed!");
});

let i = 0;
const games = [];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});

// Join a game
app.get('/api/player',(req,res, next)=> {
  let id = req.query.id;
  let game = '';
  let type = 2;
  if(games.length === 0 || i%2 === 0){
    newGame = {player1: id, player2: 1000 , word: 'none', draw: 'none'};
    games.push(newGame);
    game = newGame.player1;
    type = 1;
  }
  else {
    for(var j=0; j<games.length; j++){
      if(games[j].player2 === 1000){
        games[j].player2 = id;
        game = games[j].player1;
      }
    }
  }
  i++;
  console.log(id + ' to '+game)
  res.status(200).json({game: game, type: type});
});

// Uploading the game with word and draw
app.post('/api/game',(req, res, next) => {
  const id = req.body.player1;
  const word = req.body.word;
  const draw = req.body.draw;
  for(var j=0; j < games.length; j++){
    if(id == games[j].player1 || id == games[j].player2){
      games[j].word = word;
      games[j].draw = draw;
      console.log('Game ' + id + ' updated!')
      break;
    }
  }
  res.status(200).json({message:'Game upadted sucessfully'});
});

// Check if player 1 update the game
app.get('/api/game',(req,res, next)=> {
  const id = req.query.id;
  for(var j=0; j < games.length; j++){
    if(id == games[j].player1 || id == games[j].player2){
      res.json({game: games[j]});
    }
    else if (j == games.length && id != games[j].player2) {res.json({
      game: {player1: 1000, player2: 1000, word: 'none', draw: 'none'}});
    }
  }
});

app.get('/api/session',(req,res, next)=> {
  Game.findOne().sort({timer:1}).then(documents => {
    res.status(200).json({
      timer: documents.timer
    });
  });
});

app.post('/api/session',(req, res, next) => {
  const game = new Game ({
    player1: req.body.player1,
    player2: req.body.player2,
    timer: req.body.timer
  });
  console.log(game);
  game.save().then( sessionSaved => {
    console.log(game);
    res.status(200).json({message:'New score added!'});
  });
});

module.exports = app;


// vMAmHc1IhFybxLQi
