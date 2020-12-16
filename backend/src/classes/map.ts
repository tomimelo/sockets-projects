import { MapMarker } from "./map-marker";

export class Map {

    private markers: { [key: string]: MapMarker } = {}
    
    constructor() {}

    getMarkers() {
        return this.markers;
    }

    addMarker(marker: MapMarker) {
        this.markers[marker.id] = marker;
        return marker;
    }

    deleteMarker(id: string) {
        delete this.markers[id];
        return this.markers;
    }

    moveMarker(marker: MapMarker) {
        this.markers[marker.id].lng = marker.lng;
        this.markers[marker.id].lat = marker.lat;
        return this.markers[marker.id];
    }
}