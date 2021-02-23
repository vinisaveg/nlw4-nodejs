import "reflect-metadata";

import express, { Request, Response } from "express";

import "./database";

import router from "./routes";

export const bootstrapServer = async () => {
    const app = express();

    app.use(express.json());

    app.use(router);

    app.get("/helloworld", (req: Request, res: Response) => {
        res.status(200).json({
            message: "Hello World!",
            status: res.statusCode,
            hostname: req.hostname,
        });
    });

    return app.listen(3333);
};
