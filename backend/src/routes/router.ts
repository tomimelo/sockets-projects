import {Router, Request, Response} from 'express';
import { ChartData } from '../classes/chart';
import { PollData } from '../classes/poll';
import Server from '../classes/server';

const router = Router();

const chart = new ChartData();
const poll = new PollData();

router.get("/chart", (req: Request, res: Response) => {
    res.json({
        ok: true,
        data: chart.getChartData()
    });
});

router.post("/chart", (req: Request, res: Response) => {
    const {month, value} = req.body;

    chart.changeValue(month, Number(value));

    const server = Server.instance;
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