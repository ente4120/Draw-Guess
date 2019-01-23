import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameService } from '../game.service';
import { Player } from '../player';
import { Game } from '../game';
import { Subscription } from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-waiting',
  templateUrl: './waiting.component.html',
  styleUrls: ['./waiting.component.css']
})
export class WaitingComponent implements OnInit {

  player: Player;
  connection: number;
  type: number;
  game: Game;
  lastGame: Game;
  private connectionSub: Subscription;
  private typeSub: Subscription;
  private gameSub: Subscription;

  constructor(private gameService: GameService, public router: Router) { }

  ngOnInit() {
    if (this.gameService.connection === undefined) {
      this.createPlayer();
      this.lastGame = {player1: 1000, player2: 1000, word: 'none', draw: 'none'};
    } else {
      this.player = this.gameService.player;
      this.type = this.gameService.type;
      this.connection = this.gameService.connection;
      this.lastGame = this.gameService.lastGame;
    }

    this.connectionSub = this.gameService.getConnectionUpdateListener()
    .subscribe((connection: number) => {
      this.connection = connection;
    });
    this.typeSub = this.gameService.getTypeUpdateListener()
      .subscribe((type: number) => {
        this.type = type;
      });
    this.gameSub = this.gameService.getGameUpdateListener()
    .subscribe( (game: Game) => {
      this.game = game;
    });
    setTimeout(() => {this.checkConnection(); }, 2000);
  }

    createPlayer() {
      this.player = {id: Math.floor(Math.random() * 100) , score: 0 };
      this.gameService.joinGame(this.player);
    }

    checkConnection() {
      if (this.connection === undefined) {
        setTimeout(() => {this.checkConnection(); }, 4000);
      } else {console.log(this.connection); this.checkForGame(); }
    }

    checkForGame() {
      this.gameService.checkForOpponent();
      if (this.game === undefined || this.game.player2 === 1000) {
        setTimeout(() => {this.checkForGame(); }, 4000);
      } else {
        if (this.type === 1) {
          if (this.game.player2 !== 1000) {
            this.router.navigate(['/word']);
          } else { setTimeout(() => {this.checkForGame(); }, 4000); }
        }
        if (this.type === 2) {
          if (this.game.draw === 'none' || this.game.word === this.lastGame.word ) {
            setTimeout(() => {this.checkForGame(); }, 4000);
          } else {this.router.navigate(['/guessing']); }
        }
     }
    }

    ngOnDelete() {
      this.connectionSub.unsubscribe();
      this.typeSub.unsubscribe();
      this.gameSub.unsubscribe();
    }
}



// console.log('The player: ' + this.player.id);
// console.log('The connections: ' + this.connection);
// console.log('The type: ' + this.type);
// console.log('The player 2: ' + this.game.player2);
