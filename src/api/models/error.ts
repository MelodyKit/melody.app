import { type ErrorCode, parseErrorCode } from "../errors.ts";

export interface ErrorModel {
    code: string;
    message: string;
}

export interface ErrorType {
    code: string;
    message: string;
}

export const errorTypeFromModel = (model: ErrorModel): ErrorType => {
    return {
        code: model.code,
        message: model.message,
    };
};

export class Error {
    code: string;
    message: string;

    get parsedCode(): ErrorCode {
        return parseErrorCode(this.code);
    }

    static fromModel(model: ErrorModel) {
        return new this(errorTypeFromModel(model));
    }

    constructor(error: ErrorType) {
        this.code = error.code;
        this.message = error.message;
    }

    toString() {
        return `${this.message} (${this.code})`;
    }
}
