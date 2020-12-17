import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import * as io from 'socket.io-client';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { delay, map, tap } from 'rxjs/operators';
import { IUser } from '../interfaces/user.interface';
import { Router } from '@angular/router';

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  public tempUser: IUser = null;
  public user: IUser = null;

  private socket: SocketIOClient.Socket = null;
  public socketStatus = new BehaviorSubject<boolean>(false);
  public isLogging: boolean = false;

  constructor(private http: HttpClient,
              private router: Router) {
    this.loadStorage();
  }

  checkStatus() {

    this.socket.on('connect', () => {
      this.changeSocketStatus(true);
      this.isLogging = false;
      this.emit("new-user", this.tempUser, (user) => {
        this.user = user;
        this.tempUser = null;
        this.saveStorage();
      });
    });

    this.socket.on('disconnect', () => {
      this.changeSocketStatus(false);
    });

  }

  getSocketStatus(): Observable<boolean> {
    return this.socketStatus.asObservable();
  }

  changeSocketStatus(status: boolean) {
    this.socketStatus.next(status);
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

  getUser() {
    return this.user;
  }

  login(name) {
    this.isLogging = true;
    return this.http.post(`${base_url}/login`, name)
            .pipe(
              delay(2000),
              tap((resp: any) => {
                this.tempUser = resp.user;
                this.socket = io.connect(base_url);
                this.checkStatus();
              }),
              map((resp: any) => resp.user)
            );
  }

  saveStorage() {
    localStorage.setItem('user', JSON.stringify(this.user));
  }

  loadStorage() {
    if(localStorage.getItem("user")) {
      this.tempUser = JSON.parse(localStorage.getItem("user"));
      this.login({name: this.tempUser.name}).subscribe();
    }
  }

  logout(){
    localStorage.removeItem("user");
    this.user = null;
    this.tempUser = null;
    this.socket.disconnect()
    this.router.navigateByUrl("/login");
  }

}
