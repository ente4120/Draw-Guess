import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../game.service';

import { Game } from '../game';

@Component({
  selector: 'app-drawing',
  templateUrl: './drawing.component.html',
  styleUrls: ['./drawing.component.css']
})
export class DrawingComponent implements OnInit {

  constructor(private route: ActivatedRoute, private gameService: GameService) { }

  word = '';
  coordinate: string;

  ngOnInit() {
    this.word = this.route.snapshot.paramMap.get('word');
  }

  // Update the game settings and sending it to opponent
  updateGame() {
    this.gameService.nextGame();
    this.gameService.updateGame(this.word, JSON.stringify(this.coordinate));
  }
}
