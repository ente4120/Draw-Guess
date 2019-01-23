import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Game } from './game';
import { Player } from './player';
import { Session } from './session';

@Injectable({
  providedIn: 'root'
})

export class GameService {
  type: number;
  player: Player;
  opponent: Player;
  currentGame: Game;
  lastGame: Game;
  connection: number;
  points: number;
  timer: number;
  session: Session;
  bestScore: number;

  private connectionUpdated = new Subject<number>();
  private typeUpdated = new Subject<number>();
  private gameUpdated = new Subject<Game>();
  private scoreUpdated = new Subject<number>();

  easy = ['bird', 'fish', 'eyes', 'apple', 'banana'];
  medium = ['pig', 'shark', 'window', 'love', 'tree'];
  hard = ['lion', 'table', 'camera', 'coin', 'moveo'];

  constructor(private http: HttpClient) { }

  // Join to a game
  joinGame(player: Player) {
    this.player = player;
    console.log('Player ' + player.id + ' connect server');
    this.http.get<{game: number, type: number}>('http://localhost:3000/api/player', {params: {id: this.player.id.toString()}})
    .subscribe( (data) => {
      this.opponent = {id: 1000, score: 0};
      this.connection = data.game;
      this.type = data.type;
      this.connectionUpdated.next(this.connection);
      this.typeUpdated.next(this.type);
    });
  }
  // Update game word and draw
  updateGame(word: string, draw: string) {
    this.currentGame.word = word;
    this.currentGame.draw = draw;
    this.currentGame = {player1: this.player.id, player2: this.currentGame.player2, word: word, draw: draw };
    this.http.post<{any}>('http://localhost:3000/api/game', this.currentGame).subscribe();
  }

  // Checking opponent
  checkForOpponent() {
    console.log('Player ' + this.player.id + ' is waiting for opponent');
    this.http.get<{game: Game}>('http://localhost:3000/api/game', {params: {id: this.player.id.toString()}})
    .subscribe( (dataType) => {
      this.currentGame = dataType.game;
      this.gameUpdated.next(this.currentGame);
    });
  }

    // Save session
    saveSession() {
      this.session = {player1: this.player.id, player2: this.currentGame.player2, timer: this.timer };
      this.http.post<{any}>('http://localhost:3000/api/session', this.session).subscribe();
    }

    // Get best score
    getBestScore() {
      this.http.get<{timer: number}>('http://localhost:3000/api/session')
      .subscribe( (data) => {
        console.log(data);
        this.bestScore = data.timer;
        this.scoreUpdated.next(this.bestScore);
      });
    }

  // Lisenters
  // 1
  getConnectionUpdateListener() {
    return this.connectionUpdated.asObservable();
  }
  // 2
  getTypeUpdateListener() {
    return this.typeUpdated.asObservable();
  }
  // 3
  getGameUpdateListener() {
    return this.gameUpdated.asObservable();
  }

  // 4
  getScoreUpdateListener() {
    return this.scoreUpdated.asObservable();
  }

  choosingWords() {
    const words = [];
    for (let i = 0; i < 3 ; i++) {
      const random = Math.floor(Math.random() * 5);
      if ( i === 0 ) { words.push(this.hard[random]);
      } else if ( i === 1 ) { words.push(this.medium[random]);
      } else { words.push(this.easy[random]); }
    }
    return words;
  }

  nextGame() {
    this.lastGame = this.currentGame;
    if ( this.type === 1) {
      this.type = 2;
      this.connection = this.currentGame.player2;
      console.log('Player 2 got ' + this.points);
      this.opponent.score += this.points;
    } else {
      this.type = 1;
      this.connection = this.player.id;
      console.log('Player 1 got ' + this.points);
      this.player.score += this.points;
      this.saveSession();
    }
  }

  pointsUpdate(points: number) {
    this.points = points;
  }

  pointsCheck(word: string) {
    if ( this.hard.indexOf(word) !== -1) {this.points = 5;
    } else if (this.medium.indexOf(word) !== -1) {this.points = 3;
    } else {this.points = 1; }
  }
}
