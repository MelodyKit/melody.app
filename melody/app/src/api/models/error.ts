import { ErrorCode, type ErrorCodeLiteral } from "@/api/codes";

import { isNumber, isString } from "@/api/typing";

export interface ErrorModel {
    code: number;
    message: string;
}

export interface ErrorType {
    code: ErrorCodeLiteral;
    message: string;
}

export const errorTypeFromModel = (model: ErrorModel): ErrorType => {
    return {
        code: model.code as ErrorCodeLiteral,  // SAFETY: allow unknown codes here
        message: model.message,
    }
}

export const isErrorType = (error: any): error is ErrorType => {
    return error && isNumber(error.code) && isString(error.message);
};

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

    toString() {
        return `${this.message} (code ${this.code})`;
    }
}
