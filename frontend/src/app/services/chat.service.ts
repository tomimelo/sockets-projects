import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { WebSocketService } from './web-socket.service';

const server_api = environment.server_api;

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient,
              private wsService: WebSocketService) { }

  getUsers() {
    return this.http.get(`${server_api}/users`)
            .pipe(
              map((resp: any) => resp.users)
            );
  }

  sendMessage(msg) {
    
    const newMsg = {
      user_id: this.wsService.user.id,
      name: this.wsService.user.name,
      color: this.wsService.user.color,
      message: msg
    }

    this.wsService.emit("new-message", newMsg);
  }
}
