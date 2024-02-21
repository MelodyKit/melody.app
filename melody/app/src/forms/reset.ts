import { type ResetDataAndToken } from "@/api/data/reset";

import { type Nullable } from "@/nullable";

export interface ResetForm {
    token: Nullable<string>;
    password: Nullable<string>;
    confirm: Nullable<string>;
}

export function resetFormIntoDataAndToken(form: ResetForm): ResetDataAndToken {
    const token = form.token;

    if (token == null) {
        throw new Error("token is not present");
    }

    const password = form.password;

    if (password == null) {
        throw new Error("password is not present");
    }

    const confirm = form.confirm;

    if (confirm == null) {
        throw new Error("confirm is not present");
    }

    if (password !== confirm) {
        throw new Error("password mismatch");
    }

    return [{password}, token];
}
