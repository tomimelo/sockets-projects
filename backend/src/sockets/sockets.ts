import { Socket } from "socket.io";
import socketIO from "socket.io";
import { Map } from "../classes/map";
import { MapMarker } from "../classes/map-marker";


export const map = new Map();
export const mapSockets = (client: Socket, io: socketIO.Server) => {
    client.on("new-marker", (marker: MapMarker) => {
        map.addMarker(marker);
        client.broadcast.emit("new-marker", marker);
    });
    client.on("delete-marker", (id: string) => {
        map.deleteMarker(id);
        client.broadcast.emit("delete-marker", id);
    });
    client.on("move-marker", (marker: MapMarker) => {
        map.moveMarker(marker);
        client.broadcast.emit("move-marker", marker);
    });

}