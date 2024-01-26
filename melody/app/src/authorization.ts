import { Tokens } from "@/models/tokens";

export const AUTHORIZATION = "Authorization";
export const DEFAULT_TOKEN_TYPE = "Bearer";

export function authorization(type: string, content: string) {
    return `${type} ${content}`;
}

export function authorizationDefault(content: string) {
    return authorization(DEFAULT_TOKEN_TYPE, content);
}

export function authorizationAccess(tokens: Tokens) {
    return authorization(tokens.tokenType, tokens.accessToken);
}

export function authorizationRefresh(tokens: Tokens) {
    return authorization(tokens.tokenType, tokens.refreshToken);
}

export function authorizationDefaultHeader(content: string) {
    return {[AUTHORIZATION]: authorizationDefault(content)};
}

export function authorizationAccessHeader(tokens: Tokens) {
    return {[AUTHORIZATION]: authorizationAccess(tokens)};
}

export function authorizationRefreshHeader(tokens: Tokens) {
    return {[AUTHORIZATION]: authorizationRefresh(tokens)};
}
