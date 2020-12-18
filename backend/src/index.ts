import Server from "./classes/server";
import { SERVER_PORT } from "./global/environment";
import router from "./routes/router";
import express from "express";
import cors from "cors";
import path from "path";

const server = Server.instance;

server.app.use(express.json());
server.app.use(express.static("public"));

server.app.use( (req, res, next) => { next(); }, cors({origin: true, credentials: true}) );

server.app.use('/api', router);

server.app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

server.start( () => {
    console.log(`Server running on port ${SERVER_PORT}`);
});