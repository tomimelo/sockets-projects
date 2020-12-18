import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const server_api = environment.server_api;

@Injectable({
  providedIn: 'root'
})
export class PollService {

  public vote: any = null;

  constructor(private http: HttpClient) {
    this.loadStorage();
  }

  getData() {
    return this.http.get(`${server_api}/poll`)
      .pipe(
        map((resp: any) => resp.data)
      );
  }

  changeValue(option) {
    return this.http.post(`${server_api}/poll`, option)
      .pipe(
        map((resp: any) => resp.data)
      );
  }

  saveStorage(option) {
    localStorage.setItem("poll-vote", JSON.stringify(option));
    this.vote = option;
  }

  loadStorage() {
    if(localStorage.getItem("poll-vote")) {
      this.vote = JSON.parse(localStorage.getItem("poll-vote"));
    }
  }
}
