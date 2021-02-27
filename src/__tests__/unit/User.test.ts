import * as yup from "yup";

import { User } from "../../models/User";

describe("User", () => {
    const userSchema = yup.object().shape({
        name: yup.string().required(),
        email: yup.string().email().required(),
    });

    it("should create a valid User", async () => {
        let user = new User();

        user.name = "Vinicius";
        user.email = "vinisaveg@example.com";

        let validation = await userSchema.isValid(user);

        expect(validation).toBe(true);
    });
});
