import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from "rxjs/operators";

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get(`${base_url}/chart`)
      .pipe(
        map((resp: any) => resp.data)
      );
  }
}
