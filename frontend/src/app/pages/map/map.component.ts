import { Component, OnDestroy, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { Subscription } from 'rxjs';

import { IPlace } from 'src/app/interfaces/place.interface';
import { MapService } from 'src/app/services/map.service';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {

  private map: mapboxgl.Map;
  private socketStatus$: Subscription;
  private newMarkers$: Subscription;
  private deleteMarkers$: Subscription;
  private moveMarkers$: Subscription;
  private mapboxMarkers: {[key: string]: mapboxgl.Marker} = {}
  private places: {[key: string]: IPlace} = {};

  constructor(private mapService: MapService,
              public wsService: WebSocketService) { }

  ngOnInit(): void {
    this.getMarkers();
    this.socketStatus$ = this.wsService.getSocketStatus().subscribe(status => {
      if(status) {
        this.listenSockets();
      }
    });
  }

  ngOnDestroy(): void {
    this.socketStatus$.unsubscribe();
    this.newMarkers$.unsubscribe();
    this.deleteMarkers$.unsubscribe();
    this.moveMarkers$.unsubscribe();
  }

  createMap() {
    (mapboxgl as any).accessToken = environment.mapbox_token;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-75.75512993582937, 45.349977429009954],
      zoom: 16
    });

    for(const [key, marker] of Object.entries(this.places)) {
      this.addMarker(marker);
    }
  }

  addMarker(marker: IPlace) {

    const h3 = document.createElement("h3");
    h3.innerText = marker.name;

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";

    const div = document.createElement("div");
    div.append(h3, deleteBtn);
    
    const customPopup = new mapboxgl.Popup({
      offset: 25,
      closeOnClick: false
    }).setDOMContent(div);

    const newMarker = new mapboxgl.Marker({
      draggable: true,
      color: marker.color
    })
    .setLngLat([marker.lng, marker.lat])
    .setPopup(customPopup)
    .addTo(this.map);

    newMarker.on('drag', () => {
      const lngLat = newMarker.getLngLat();
      this.wsService.emit("move-marker", {id: marker.id, ...lngLat});
    });

    deleteBtn.addEventListener('click', () => {
      newMarker.remove();
      this.wsService.emit("delete-marker", marker.id);
    });

    this.mapboxMarkers[marker.id] = newMarker;

  }

  createMarker() {
    const marker: IPlace = {
      id: new Date().toISOString(),
      lng: -75.75512993582937,
      lat: 45.349977429009954,
      name: this.wsService.user.name,
      color: `#${Math.floor(Math.random()*16777215).toString(16)}`  
    }
    
    this.addMarker(marker);
    this.wsService.emit("new-marker", marker);
  }

  listenSockets() {
    this.newMarkers$ = this.wsService.listen("new-marker").subscribe((marker: IPlace) => {
      this.addMarker(marker);
    });
    this.deleteMarkers$ = this.wsService.listen("delete-marker").subscribe((id: string) => {
      this.mapboxMarkers[id].remove();
      delete this.mapboxMarkers[id];
      delete this.places[id];
    });
    this.moveMarkers$ = this.wsService.listen("move-marker").subscribe((marker: IPlace) => {
      this.mapboxMarkers[marker.id].setLngLat([marker.lng, marker.lat]);
    });
  }

  getMarkers() {
    this.mapService.getMarkers().subscribe(markers => {
      this.places = markers;
      this.createMap();
    });
  }

}