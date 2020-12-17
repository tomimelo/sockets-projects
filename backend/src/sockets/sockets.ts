import { Socket } from "socket.io";
import socketIO from "socket.io";
import { Map } from "../classes/map";
import { MapMarker } from "../classes/map-marker";
import { UsersList } from "../classes/users-list";

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

export const connectedUsers = new UsersList();
export const userSockets = (client: Socket, io: socketIO.Server) => {
    client.on("disconnect", () => {
        connectedUsers.deleteUser(client.id);
        io.emit("active-users", connectedUsers.getList());
    });
    client.on("new-user", (user, callback: Function) => {
        const newUser = connectedUsers.addUser(user, client.id);
        io.emit("active-users", connectedUsers.getList());
        callback(newUser);
    });
    client.on("active-users", () => {
        io.to(client.id).emit("active-users",  connectedUsers.getList());
    });
    client.on("new-message", (payload, callback) => {
        io.emit("new-message", payload);
    });
}