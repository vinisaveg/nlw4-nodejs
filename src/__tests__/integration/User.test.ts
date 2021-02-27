import request from "supertest";
import { getConnection } from "typeorm";

import { app } from "../../server";

import createConnection from "../../database";

describe("User", () => {
    beforeAll(async () => {
        const connection = await createConnection();

        await connection.runMigrations();
    });

    afterAll(async () => {
        const connection = getConnection();

        await connection.dropDatabase();
        await connection.close();
    });

    it("Should be able to create a new user", async () => {
        const response = await request(app).post("/users").send({
            name: "Example da silva",
            email: "example@example.com",
        });

        expect(response.status).toBe(201);
    });

    it("Should not be able to create a user with existed e-mail", async () => {
        const response = await request(app).post("/users").send({
            name: "Example da silva",
            email: "example@example.com",
        });

        expect(response.status).toBe(400);
    });
});
