export interface TokensModel {
    access_token: string;
    refresh_token: string;
    token_type: string;
    expires_in: number;
    scope: string;
}

export interface TokensType {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    expiresIn: number;
    scope: string;
}

export function tokensTypeFromModel(model: TokensModel): TokensType {
    return {
        accessToken: model.access_token,
        refreshToken: model.refresh_token,
        tokenType: model.token_type,
        expiresIn: model.expires_in,
        scope: model.scope,
    };
}

const SCOPE_SEPARATOR = " ";

export class Tokens {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    expiresIn: number;
    scopes: string[];

    static fromModel(model: TokensModel) {
        return new this(tokensTypeFromModel(model));
    }

    constructor(tokens: TokensType) {
        this.accessToken = tokens.accessToken;
        this.refreshToken = tokens.refreshToken;
        this.tokenType = tokens.tokenType;
        this.expiresIn = tokens.expiresIn;

        let scope = tokens.scope;

        this.scopes = scope ? scope.split(SCOPE_SEPARATOR) : [];
    }
}
