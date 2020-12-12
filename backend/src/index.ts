import Server from "./classes/server";
import { SERVER_PORT } from "./global/environment";
import router from "./routes/router";
import { json } from "express";
import cors from "cors";

const server = Server.instance;

server.app.use(json());

server.app.use( (req, res, next) => { next(); }, cors({origin: true, credentials: true}) );

server.app.use('/', router);

server.start( () => {
    console.log(`Server running on port ${SERVER_PORT}`);
});