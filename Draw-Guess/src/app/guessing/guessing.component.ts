import {Component, ElementRef, ViewChild, OnInit} from '@angular/core';
import { Game } from '../game';
import { GameService } from '../game.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-guessing',
  templateUrl: './guessing.component.html',
  styleUrls: ['./guessing.component.css']
})
export class GuessingComponent implements OnInit {

  // Canvas:
  @ViewChild('canvas') public canvas: ElementRef;
  private cx: CanvasRenderingContext2D;

  // Game:
  currentGame: Game;
  coor: any[] = [];
  word = '';
  loading = true;
  points = 0;
  timer = 0;
  interval;

  constructor(private gameService: GameService, public router: Router) { }

  ngOnInit() {
    this.currentGame = this.gameService.currentGame;
    this.pointsCheck(this.currentGame.word);
    this.startTimer();

    if (this.currentGame !== undefined) {
      // Canvas filling:
      this.coor = JSON.parse(this.currentGame.draw);
      this.fillCanvas(); }

  }

  fillCanvas() {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.cx = canvasEl.getContext('2d');
    canvasEl.width = 250;
    canvasEl.height = 300;
    this.cx.lineWidth = 3;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = '#000';

    for (let i = 0 ; i < this.coor.length; i++) {
      setTimeout(() => {
        if (i === 0) { this.drawOnCanvas(this.coor[i], this.coor[i]);
        } else { this.drawOnCanvas(this.coor[i - 1], this.coor[i]); }
      }, 1000);
    }
  }

  // Canvas filling points
  private drawOnCanvas(prevPos: { x: number, y: number }, currentPos: { x: number, y: number }) {
    if (!this.cx) { return; }
    this.cx.beginPath();
    if (prevPos) {
      this.cx.moveTo(prevPos.x, prevPos.y);
      this.cx.lineTo(currentPos.x, currentPos.y);
      this.cx.stroke();
    }
  }

  checkGuess() {
    if (this.word.toLowerCase() === this.currentGame.word.toLowerCase()) {
      setTimeout(() => {this.createNewGame(); }, 2000);
      this.loading = false;
    }
  }

  createNewGame() {
    this.pauseTimer();
    this.gameService.timer = this.timer;
    this.gameService.nextGame();
    this.router.navigate(['/waiting']);
  }

  startTimer() {
    this.interval = setInterval(() => { this.timer++; }, 1000);
  }

  pauseTimer() {
    clearInterval(this.interval);
    console.log('Timer: ' + this.timer);
  }

  pointsCheck(word: string) {
    this.gameService.pointsCheck(word);
  }

}
