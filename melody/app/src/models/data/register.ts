import { type Optional } from "@/typing";

export interface RegisterForm {
    name: Optional<string>;
    email: Optional<string>;
    password: Optional<string>;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
}

export function registerDataFromForm(form: RegisterForm): RegisterData {
    const name = form.name;

    if (name == null) {
        throw new Error("expected name");
    }

    const email = form.email;

    if (email == null) {
        throw new Error("expected email");
    }

    const password = form.password;

    if (password == null) {
        throw new Error("expected password");
    }

    return {name, email, password};
}
