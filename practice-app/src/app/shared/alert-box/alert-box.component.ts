import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert-box',
  templateUrl: './alert-box.component.html',
  styleUrls: ['./alert-box.component.scss']
})
export class AlertBoxComponent implements OnInit {

  @Input() error: string;
  @Output() OkEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onOk() {
    this.OkEvent.emit();
  }

}
