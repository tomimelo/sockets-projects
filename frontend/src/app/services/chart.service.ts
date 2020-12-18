import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from "rxjs/operators";

const server_api = environment.server_api;

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get(`${server_api}/chart`)
      .pipe(
        map((resp: any) => resp.data)
      );
  }

  changeValue(month, value) {
    return this.http.post(`${server_api}/chart`, {month, value})
      .pipe(
        map((resp: any) => resp.data)
      );
  }
}
