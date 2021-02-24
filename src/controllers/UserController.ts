import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";

import { UsersRepository } from "../repositories/UsersRepository";
export class UserController {
    async create(request: Request, response: Response) {
        const { name, email } = request.body;

        const usersRepository = getCustomRepository(UsersRepository);

        const userAlreadyExists = await usersRepository.findOne({
            email,
        });

        if (userAlreadyExists) {
            return response.status(400).json({
                message: "This e-mail already exists",
            });
        }

        const newUser = usersRepository.create({
            name,
            email,
        });

        await usersRepository.save(newUser);

        return response.status(201).json(newUser);
    }
}
