import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.scss']
})
export class ServersComponent implements OnInit {
  allowNewServer = false;
  serverCreationStatus = 'No server was created!'
  serverName = 'testserver';
  serverCreated = false;
  username = '';
  servers = ['Testserver','Testserver2'];
  displayDetails = false;
  clickLog = [];

  constructor() { 
    setTimeout(() => {
      this.allowNewServer = true;
    },2000);
  }

  ngOnInit(): void {
  }

  onCreateServer() {
    this.serverCreationStatus = `Server was created, name is ${this.serverName}`;
    this.servers.push(this.serverName);
    this.serverCreated = true;
  }

  onUpdateServerName(event: Event) {
    this.serverName = (<HTMLInputElement>event.target).value;
  }

  clearUsername() {
    this.username = '';
  }

  onClickToggle() {
    this.displayDetails = !this.displayDetails;
    this.clickLog.push(this.clickLog.length + 1);
  }

}
