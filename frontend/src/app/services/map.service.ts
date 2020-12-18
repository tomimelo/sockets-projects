import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const server_api = environment.server_api;

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private http: HttpClient) { }

  getMarkers() {
    return this.http.get(`${server_api}/map`)
            .pipe(
              map((resp: any) => resp.markers)
            )
  }
}
