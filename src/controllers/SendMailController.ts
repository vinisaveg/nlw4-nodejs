import { Request, Response } from "express";
import { resolve } from "path";
import { getCustomRepository } from "typeorm";

import { SurveysRepository } from "../repositories/SurveysRepository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import { UsersRepository } from "../repositories/UsersRepository";
import SendMailService from "../services/SendMailService";

export class SendMailController {
    async execute(request: Request, response: Response) {
        const { email, survey_id } = request.body;

        const usersRepository = getCustomRepository(UsersRepository);
        const surveysRepository = getCustomRepository(SurveysRepository);
        const surveysUsersRepository = getCustomRepository(
            SurveysUsersRepository
        );

        const userAlreadyExists = await usersRepository.findOne({ email });

        if (!userAlreadyExists) {
            return response.status(400).json({
                message: "User does not exist",
            });
        }

        const surveyAlreadyExists = await surveysRepository.findOne({
            id: survey_id,
        });

        if (!surveyAlreadyExists) {
            return response.status(400).json({
                message: "Survey does not exist",
            });
        }

        const variables = {
            name: userAlreadyExists.name,
            title: surveyAlreadyExists.title,
            description: surveyAlreadyExists.description,
            user_id: surveyAlreadyExists.id,
            link: process.env.URL_MAIL,
        };

        const npsPath = resolve(
            __dirname,
            "..",
            "views",
            "emails",
            "npsMail.hbs"
        );

        const surveyUserAlreadyExist = await surveysUsersRepository.findOne({
            where: [{ user_id: userAlreadyExists.id }, { value: null }],
            relations: ["user", "survey"],
        });

        if (surveyUserAlreadyExist) {
            await SendMailService.execute(
                email,
                surveyAlreadyExists.title,
                variables,
                npsPath
            );

            return response.json(surveyUserAlreadyExist);
        }

        const newSurveyUser = surveysUsersRepository.create({
            user_id: userAlreadyExists.id,
            survey_id,
        });

        await surveysUsersRepository.save(newSurveyUser);

        await SendMailService.execute(
            email,
            surveyAlreadyExists.title,
            variables,
            npsPath
        );

        return response.status(201).json(newSurveyUser);
    }
}
