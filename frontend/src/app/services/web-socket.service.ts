import { Injectable } from '@angular/core';

import * as io from 'socket.io-client';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { IUser } from '../interfaces/user.interface';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { PollService } from './poll.service';
import { environment } from 'src/environments/environment';

const server = environment.server;
const server_api = environment.server_api;

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
              private router: Router,
              private pollService: PollService) {
    this.loadStorage();
  }

  checkStatus() {

    this.socket.on('connect', () => {
      this.changeSocketStatus(true);
      this.isLogging = false;
      this.emit("new-user", this.tempUser, (user) => {
        this.user = user;
        this.saveStorage();
      });
    });

    this.socket.on('disconnect', () => {
      this.changeSocketStatus(false);
      this.logout();
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
    return this.http.post(`${server_api}/login`, name)
            .pipe(
              tap((resp: any) => {
                this.tempUser = resp.user;
                this.socket = io.connect(server);
                this.checkStatus();
              }),
              map((resp: any) => resp.user),
              catchError((err: HttpErrorResponse) => {
                Swal.fire(
                  'Error',
                  'An error has occurred, please try again later',
                  'error'
                );
                this.isLogging = false;
                return throwError(err);
              })
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
    localStorage.removeItem("poll-vote");
    this.pollService.vote = null;
    this.user = null;
    this.tempUser = null;
    this.socket.disconnect()
    this.router.navigateByUrl("/login");
  }

}
