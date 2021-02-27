import * as yup from "yup";

import { Survey } from "../../models/Survey";

describe("Survey", () => {
    const surveySchema = yup.object().shape({
        title: yup.string().required(),
        description: yup.string().required(),
    });

    it("should create a valid Survey", async () => {
        let survey = new Survey();

        survey.title = "Survey title";
        survey.description = "Survey description";

        let validation = await surveySchema.isValid(survey);

        expect(validation).toBe(true);
    });
});
