import express, { Request, Response } from "express";

export const bootstrapServer = async () => {
    const app = express();

    app.use(express.json());

    app.get("/helloworld", (req: Request, res: Response) => {
        res.status(200).json({
            message: "Hello World!",
            status: res.statusCode,
            hostname: req.hostname,
        });
    });

    return app.listen(3333);
};
