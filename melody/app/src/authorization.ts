import { Tokens } from "@/models/tokens";

export const AUTHORIZATION = "Authorization";
export const DEFAULT_TOKEN_TYPE = "Bearer";

export function authorizationString(type: string, content: string) {
    return `${type} ${content}`;
}

export function authorizationDefault(content: string) {
    return authorizationString(DEFAULT_TOKEN_TYPE, content);
}

export function authorization(tokens: Tokens) {
    return authorizationString(tokens.tokenType, tokens.accessToken);
}

export function authorizationDefaultHeader(content: string) {
    return {[AUTHORIZATION]: authorizationDefault(content)};
}

export function authorizationHeader(tokens: Tokens) {
    return {[AUTHORIZATION]: authorization(tokens)};
}
