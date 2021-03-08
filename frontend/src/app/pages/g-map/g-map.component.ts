import { Component, OnInit } from '@angular/core';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { Loader } from "@googlemaps/js-api-loader";
import { environment } from 'src/environments/environment';
import { google } from 'google-maps';

@Component({
  selector: 'app-g-map',
  templateUrl: './g-map.component.html',
  styleUrls: ['./g-map.component.css']
})
export class GMapComponent implements OnInit {

  private mapLoader = new Loader({
    apiKey: environment.gmap_apiKey,
    version: "weekly"
  });
  private map: google.maps.Map;

  constructor(public wsService: WebSocketService) { }

  ngOnInit(): void {
    this.createMap();
  }

  createMap() {
    this.mapLoader.load().then(() => {
      this.map = new google.maps.Map(document.getElementById("gmap") as HTMLElement, {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
        scrollwheel: true,
        mapTypeControl: true
      });
    });
  }

  

}
