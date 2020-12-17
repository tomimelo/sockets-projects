import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PollService } from 'src/app/services/poll.service';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router,
              private pollService: PollService,
              private wsService: WebSocketService) { }

  ngOnInit(): void {
  }

  logout(){
    this.wsService.logout();
  }

}
