import * as yup from "yup";

import { SurveyUser } from "../../models/SurveyUser";

describe("SurveyUser", () => {
    const surveyUserSchema = yup.object().shape({
        user_id: yup.string().required(),
        survey_id: yup.string().required(),
        value: yup.number().nullable(),
    });

    it("should create a valid SurveyUser", async () => {
        let surveyUser = new SurveyUser();

        surveyUser.user_id = "1";
        surveyUser.survey_id = "1";

        let validation = await surveyUserSchema.isValid(surveyUser);

        expect(validation).toBe(true);
    });

    it("should set a value to the given SurveyUser", () => {
        let surveyUser = new SurveyUser();

        surveyUser.user_id = "1";
        surveyUser.survey_id = "1";
        surveyUser.value = null;

        expect(surveyUser.value).toBeNull();

        surveyUser.value = 4;

        expect(surveyUser.value).toBe(4);
    });
});
