import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  count = 0;

  constructor() { }

  addCount() {
    this.count++;
  }

  getCount() {
    return this.count;
  }
}
