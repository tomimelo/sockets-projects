import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private http: HttpClient) { }

  getMarkers() {
    return this.http.get(`${base_url}/map`)
            .pipe(
              map((resp: any) => resp.markers)
            )
  }
}
