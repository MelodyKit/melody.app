import { type RegisterData } from "@/api/data/register";

import { type Nullable } from "@/nullable";

export interface RegisterForm {
    name: Nullable<string>;
    email: Nullable<string>;
    password: Nullable<string>;
}

export function registerFormIntoData(form: RegisterForm): RegisterData {
    const name = form.name;

    if (name == null) {
        throw new Error("name is not present");
    }

    const email = form.email;

    if (email == null) {
        throw new Error("email is not present");
    }

    const password = form.password;

    if (password == null) {
        throw new Error("password is not present");
    }

    return {name, email, password};
}
