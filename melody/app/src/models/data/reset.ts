import { type Optional } from "@/typing";

export interface ResetForm {
    token: Optional<string>;
    password: Optional<string>;
    confirm: Optional<string>;
}

export interface ResetData {
    token: string;
    password: string;
}

export function resetDataFromForm(form: ResetForm): ResetData {
    const token = form.token;

    if (token == null) {
        throw new Error("expected token");
    }

    const password = form.password;

    if (password == null) {
        throw new Error("expected password");
    }

    const confirm = form.confirm;

    if (confirm == null) {
        throw new Error("expected confirm");
    }

    if (password != confirm) {
        throw new Error("password mismatch");
    }

    return {token, password};
}
