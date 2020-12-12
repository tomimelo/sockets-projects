import {Router, Request, Response} from 'express';
import { ChartData } from '../classes/chart';
import Server from '../classes/server';

const router = Router();

const chart = new ChartData();

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

export default router;