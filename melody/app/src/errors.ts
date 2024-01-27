export enum ErrorCode {
    Default = 13000,

    BadRequest = 13400,
    Unauthorized = 13401,
    Forbidden = 13403,
    NotFound = 13404,
    MethodNotAllowed = 13405,
    Conflict = 13409,
    Gone = 13410,
    PayloadTooLarge = 13413,
    UnprocessableEntity = 13422,
    TooManyRequests = 13429,

    InternalServerError = 13500,

    AuthenticationError = 13600,
    AuthenticationInvalid = 13601,
    AuthenticationMissing = 13602,
    AuthenticationNotFound = 13603,
}
