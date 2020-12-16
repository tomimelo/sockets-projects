import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PollService } from 'src/app/services/poll.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router,
              private pollService: PollService) { }

  ngOnInit(): void {
  }

  logout(){
    localStorage.removeItem("poll-vote");
    this.pollService.vote = null;
    this.router.navigateByUrl("/");
  }

}
