import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { GameService } from '../game.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})

export class WelcomeComponent implements OnInit {

  constructor(private gameService: GameService, public router: Router) { }

  bestScore: number;
  private scoreSub: Subscription;

  ngOnInit() {
    this.gameService.getBestScore();

    this.scoreSub = this.gameService.getScoreUpdateListener().subscribe( (bestScore: number) => {
      console.log(bestScore);
      this.bestScore = bestScore;
    });
  }



}


