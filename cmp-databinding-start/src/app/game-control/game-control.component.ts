import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {
  counter: number = 0;
  @Output() intervalEvent = new EventEmitter<number>();
  interval;

  constructor() { }

  onStart() {
    this.interval = setInterval(() => {
      this.counter++;
      this.intervalEvent.emit(this.counter);
    }, 1000)
  }

  onPause() {
    clearInterval(this.interval);
  }

  ngOnInit(): void {
  }

}
