import "reflect-metadata";

import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";

import router from "./routes";

import createConnection from "./database";

import { AppError } from "./errors/AppError";

createConnection();

const app = express();

app.use(express.json());

app.use(router);

app.use(
    (
        error: Error,
        request: Request,
        response: Response,
        next: NextFunction
    ) => {
        if (error instanceof AppError) {
            return response.status(error.statusCode).json({
                message: error.message,
            });
        }

        return response.status(500).json({
            status: "Error",
            message: `Internal server error ${error.message}`,
        });
    }
);

export { app };

export const bootstrapServer = async () => {
    return app.listen(3333);
};
