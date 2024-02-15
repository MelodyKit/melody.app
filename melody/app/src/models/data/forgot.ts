import { type Optional } from "@/typing";

export interface ForgotForm {
    email: Optional<string>;
    code: Optional<string>;
}

export interface ForgotData {
    email: string;
    code: Optional<string>;
}

export function forgotDataFromForm(form: ForgotForm): ForgotData {
    const email = form.email;

    if (email == null) {
        throw new Error("expected email");
    }

    const code = form.code;

    return {email, code};
}
