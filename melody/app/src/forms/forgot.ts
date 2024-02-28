import { type ForgotData } from "@/api/data/forgot";

import { type Nullable } from "@/nullable";

export interface ForgotForm {
    email: Nullable<string>;
    code: Nullable<string>;
}

export const forgotFormIntoData = (form: ForgotForm): ForgotData => {
    const email = form.email;

    if (email == null) {
        throw new Error("email is not present");
    }

    const code = form.code;

    return { email, code };
};
