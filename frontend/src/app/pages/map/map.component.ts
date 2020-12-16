import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

import { IPlace } from 'src/app/interfaces/place.interface';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  map: mapboxgl.Map;
  
  places: IPlace[] = [{
    id: '1',
    name: 'Fernando',
    lng: -75.75512993582937,
    lat: 45.349977429009954,
    color: '#dd8fee'
  },
  {
    id: '2',
    name: 'Amy',
    lng: -75.75195645527508, 
    lat: 45.351584045823756,
    color: '#790af0'
  },
  {
    id: '3',
    name: 'Orlando',
    lng: -75.75900589557777, 
    lat: 45.34794635758547,
    color: '#19884b'
  }];

  constructor() { }

  ngOnInit(): void {
    this.createMap();
  }

  createMap() {
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoidG9taW1lbG9uZSIsImEiOiJja2lxbzB6eHgwaWNmMnRwOTM0cXV0enhrIn0.uywsOpnR4YxEKqSS_TMKYA';
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-75.75512993582937, 45.349977429009954],
      zoom: 16
    });

    for(const marker of this.places) {
      this.addMarker(marker);
    }
  }

  addMarker(marker: IPlace) {

    const html = `<h2>${marker.name}</h2>
                  <br>
                  <button>Delete</button>`;
    
    const customPopup = new mapboxgl.Popup({
      offset: 25,
      closeOnClick: false
    }).setHTML(html);

    const newMarker = new mapboxgl.Marker({
      draggable: true,
      color: marker.color
    })
    .setLngLat([marker.lng, marker.lat])
    .setPopup(customPopup)
    .addTo(this.map);

  }

}
