import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import * as yup from "yup";

import { AppError } from "../errors/AppError";

import { UsersRepository } from "../repositories/UsersRepository";
export class UserController {
    async create(request: Request, response: Response) {
        const { name, email } = request.body;

        let schema = yup.object().shape({
            name: yup.string().required("Name is required!"),
            email: yup.string().email().required("Email is required!"),
        });

        try {
            await schema.validate(request.body, { abortEarly: false });
        } catch (error) {
            throw new AppError(error);
        }

        const usersRepository = getCustomRepository(UsersRepository);

        const userAlreadyExists = await usersRepository.findOne({
            email,
        });

        if (userAlreadyExists) {
            throw new AppError("This e-mail already exists");
        }

        const newUser = usersRepository.create({
            name,
            email,
        });

        await usersRepository.save(newUser);

        return response.status(201).json(newUser);
    }
}
