import type { Tokens } from "./models/tokens.ts";

export const AUTHORIZATION = "Authorization";
export const DEFAULT_TOKEN_TYPE = "Bearer";

export const authorizationString = (type: string, content: string) => {
    return `${type} ${content}`;
};

export const authorizationDefault = (content: string) => {
    return authorizationString(DEFAULT_TOKEN_TYPE, content);
};

export const authorization = (tokens: Tokens) => {
    return authorizationString(tokens.tokenType, tokens.accessToken);
};

export const authorizationDefaultHeader = (content: string) => {
    return { [AUTHORIZATION]: authorizationDefault(content) };
};

export const authorizationHeader = (tokens: Tokens) => {
    return { [AUTHORIZATION]: authorization(tokens) };
};
