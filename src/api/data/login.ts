import type { Nullable } from "../nullable.ts";

export interface LoginDataType {
    email: string;
    password: string;
    code: Nullable<string>;
}

export interface LoginData {
    email: string;
    password: string;
    code: Nullable<string>;
}

export const loginDataIntoType = (data: LoginData): LoginDataType => {
    return {
        email: data.email,
        password: data.password,
        code: data.code,
    };
};
