import type { Nullable } from "../nullable.ts";

export interface ForgotDataType {
    email: string;
    code: Nullable<string>;
}

export interface ForgotData {
    email: string;
    code: Nullable<string>;
}

export const forgotDataIntoType = (data: ForgotData): ForgotDataType => {
    return {
        email: data.email,
        code: data.code,
    };
};
