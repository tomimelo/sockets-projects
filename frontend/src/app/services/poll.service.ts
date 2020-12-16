import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class PollService {

  public vote: any = null;

  constructor(private http: HttpClient) {
    this.loadStorage();
  }

  getData() {
    return this.http.get(`${base_url}/poll`)
      .pipe(
        map((resp: any) => resp.data)
      );
  }

  changeValue(option) {
    return this.http.post(`${base_url}/poll`, option)
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
