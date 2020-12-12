import { Socket } from "socket.io";
import socketIO from "socket.io";

export const disconnect = (client: Socket, io: socketIO.Server) => {
    client.on("disconnect", () => {
        console.log("Client disconnected");
    });
}