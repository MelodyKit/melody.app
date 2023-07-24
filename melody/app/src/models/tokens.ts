export interface TokensModel {
    access_token: string;
    token_type: string;
    refresh_token: string;
    created_at: string;
    access_expires_in: number;
    refresh_expires_in: number;
}

export interface TokensType {
    accessToken: string;
    tokenType: string;
    refreshToken: string;
    createdAt: string;
    accessExpiresIn: number;
    refreshExpiresIn: number;
}

export function tokensTypeFromModel(model: TokensModel): TokensType {
    return {
        accessToken: model.access_token,
        tokenType: model.token_type,
        refreshToken: model.refresh_token,
        createdAt: model.created_at,
        accessExpiresIn: model.access_expires_in,
        refreshExpiresIn: model.refresh_expires_in,
    };
}

export class Tokens {
    accessToken: string;
    tokenType: string;
    refreshToken: string;
    createdAt: Date;
    accessExpiresIn: number;
    refreshExpiresIn: number;

    static fromModel(model: TokensModel) {
        return new this(tokensTypeFromModel(model));
    }

    constructor(tokens: TokensType) {
        this.accessToken = tokens.accessToken;
        this.tokenType = tokens.tokenType;
        this.refreshToken = tokens.refreshToken;
        this.createdAt = new Date(tokens.createdAt);
        this.accessExpiresIn = tokens.accessExpiresIn;
        this.refreshExpiresIn = tokens.refreshExpiresIn;
    }
}
