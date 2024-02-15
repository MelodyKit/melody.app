import type { Optional } from "@/typing";

export interface UserForm {
    email: Optional<string>;
    password: Optional<string>;
    code: Optional<string>;
}

export interface UserData {
    email: string;
    password: string;
    code: Optional<string>;
}

export function userDataFromForm(form: UserForm): UserData {
    const email = form.email;

    if (email == null) {
        throw new Error("expected email");
    }

    const password = form.password;

    if (password == null) {
        throw new Error("expected password");
    }

    const code = form.code;

    return {email, password, code};
}
