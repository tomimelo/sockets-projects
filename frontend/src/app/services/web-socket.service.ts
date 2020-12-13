import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private socket: SocketIOClient.Socket;
  public socketStatus: boolean = false;

  constructor() {
    this.socket = io.connect(base_url);
    this.checkStatus();
  }

  checkStatus() {

    this.socket.on('connect', () => {
      this.socketStatus = true;
    });

    this.socket.on('disconnect', () => {
      this.socketStatus = false;
    });

  }

  emit(event: string, payload?: any, callback?: Function) {
    this.socket.emit(event, payload, callback);
  }

  listen(event: string) {
    return new Observable(observer => {
      this.socket.on(event, data => {
        observer.next(data);
      });
    });
  }

}
