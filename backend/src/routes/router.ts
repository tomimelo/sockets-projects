import {Router, Request, Response} from 'express';
import { ChartData } from '../classes/chart';
import { PollData } from '../classes/poll';
import Server from '../classes/server';
import { User } from '../classes/user';
import { connectedUsers, map } from '../sockets/sockets';

const router = Router();

const chart = new ChartData();
const poll = new PollData();

const server = Server.instance;

router.post("/login", (req: Request, res: Response) => {

    const { name } = req.body;

    const newUser = new User(name);

    res.json({
        ok: true,
        user: newUser
    });
});

router.get("/users", (req: Request, res: Response) => {
    res.json({
        ok: true,
        users: connectedUsers.getList()
    });
});

router.get("/map", (req: Request, res: Response) => {
    res.json({
        ok: true,
        markers: map.getMarkers()
    });
});

router.get("/chart", (req: Request, res: Response) => {
    res.json({
        ok: true,
        data: chart.getChartData()
    });
});

router.post("/chart", (req: Request, res: Response) => {
    const {month, value} = req.body;

    chart.changeValue(month, Number(value));

    server.io.emit("chart-change", chart.getChartData());

    res.json({
        ok: true,
        data: chart.getChartData()
    });
});

router.get("/poll", (req: Request, res: Response) => {
    res.json({
        ok: true,
        data: poll.getPollData()
    });
});

router.post("/poll", (req: Request, res: Response) => {
    const { option } = req.body;

    poll.changeValue(Number(option));

    const server = Server.instance;
    server.io.emit("poll-change", poll.getPollData());

    res.json({
        ok: true,
        data: poll.getPollData()
    });
});

export default router;