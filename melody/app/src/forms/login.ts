import { type LoginData } from "@/api/data/login";

import { type Nullable } from "@/nullable";

export interface LoginForm {
    email: Nullable<string>;
    password: Nullable<string>;
    code: Nullable<string>;
}

export function loginFormIntoData(form: LoginForm): LoginData {
    const email = form.email;

    if (email == null) {
        throw new Error("email is not present");
    }

    const password = form.password;

    if (password == null) {
        throw new Error("password is not present");
    }

    const code = form.code;

    return {email, password, code};
}
