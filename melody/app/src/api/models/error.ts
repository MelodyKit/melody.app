import { ErrorCode, type ErrorCodeLiteral } from "@/api/codes";

export interface ErrorModel {
    code: number;
    message: string;
}

export interface ErrorType {
    code: ErrorCodeLiteral;
    message: string;
}

export function errorTypeFromModel(model: ErrorModel): ErrorType {
    return {
        code: model.code as ErrorCodeLiteral,  // SAFETY: allow unknown codes here
        message: model.message,
    }
}

export class Error {
    code: ErrorCode;
    message: string;

    static fromModel(model: ErrorModel) {
        return new this(errorTypeFromModel(model));
    }

    constructor(error: ErrorType) {
        this.code = error.code as ErrorCode;
        this.message = error.message;
    }
}
