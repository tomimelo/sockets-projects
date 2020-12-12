import {Router, Request, Response} from 'express';
import Server from '../classes/server';

const router = Router();

router.get("/", (req: Request, res: Response) => {
    res.json({
        ok: true,
        msg: "All ok!"
    });
});

export default router;