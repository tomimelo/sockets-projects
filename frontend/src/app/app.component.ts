import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {
    document.title = "Sockets Demo";
  }
  title = 'Sockets Demo by Tomas Melone';
}
