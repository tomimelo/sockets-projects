import { Component } from '@angular/core';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  public date = new Date().getFullYear();

  constructor(public wsService: WebSocketService) { }

}
