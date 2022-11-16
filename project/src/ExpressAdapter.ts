import Http from "./Http";
import express, { Express, Request, Response } from "express";

type HttpMethod = "post" | "get" | "patch" | "put" | "delete";

export default class ExpressAdapter implements Http {
    private readonly app: Express;

    constructor() {
        this.app = express();
        this.app.use(express.json());
    };

    on(method: HttpMethod, url: string, callback: Function): void {
        this.app[method](url, async (req: Request, res: Response) => {
            const output = await callback(req.params, req.body);
            res.json(output);
        });
    }

    listen(port: number): void {
        this.app.listen(port);
    }
}