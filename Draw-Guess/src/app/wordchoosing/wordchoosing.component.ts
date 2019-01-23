import { Component, OnInit } from '@angular/core';
import { Player } from '../player';
import { GameService } from '../game.service';

@Component({
  selector: 'app-wordchoosing',
  templateUrl: './wordchoosing.component.html',
  styleUrls: ['./wordchoosing.component.css']
})
export class WordchoosingComponent implements OnInit {

  constructor(private gameService: GameService) { }

  words = [];
  player: Player;
  opponent: Player;

  ngOnInit() {
    this.chooseWord();
    this.player = this.gameService.player;
    this.opponent = this.gameService.opponent;
  }

  chooseWord() {
    this.words = this.gameService.choosingWords();
  }

  points(points: number) {
    this.gameService.pointsUpdate(points);
  }
}
