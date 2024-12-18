import { GrantType, type GrantTypeValue } from "../enums.ts";
import type { Nullable } from "../nullable.ts";

export interface TokensDataType {
  grant_type: GrantTypeValue;
  redirect_uri: Nullable<string>;
  code: Nullable<string>;
  refresh_token: Nullable<string>;
  client_id: Nullable<string>;
  client_secret: Nullable<string>;
}

export interface TokensData {
  grantType: GrantTypeValue;
  redirectUri: Nullable<string>;
  code: Nullable<string>;
  refreshToken: Nullable<string>;
  clientId: Nullable<string>;
  clientSecret: Nullable<string>;
}

export const tokensDataIntoType = (data: TokensData): TokensDataType => {
  return {
    grant_type: data.grantType,
    redirect_uri: data.redirectUri,
    code: data.code,
    refresh_token: data.refreshToken,
    client_id: data.clientId,
    client_secret: data.clientSecret,
  };
};

export interface AuthorizationCodeData {
  code: string;
  redirectUri: string;
}

export const authorizationCodeDataIntoData = (
  data: AuthorizationCodeData,
): TokensData => {
  return {
    grantType: GrantType.AuthorizationCode as GrantTypeValue,
    redirectUri: data.redirectUri,
    code: data.code,
    refreshToken: null,
    clientId: null,
    clientSecret: null,
  };
};

export interface ClientCredentialsData {
  clientId: string;
  clientSecret: string;
}

export const clientCredentialsDataIntoData = (
  data: ClientCredentialsData,
): TokensData => {
  return {
    grantType: GrantType.ClientCredentials as GrantTypeValue,
    redirectUri: null,
    code: null,
    refreshToken: null,
    clientId: data.clientId,
    clientSecret: data.clientSecret,
  };
};

export interface RefreshTokenData {
  refreshToken: string;
}

export const refreshTokenDataIntoData = (
  data: RefreshTokenData,
): TokensData => {
  return {
    grantType: GrantType.RefreshToken as GrantTypeValue,
    redirectUri: null,
    code: null,
    refreshToken: data.refreshToken,
    clientId: null,
    clientSecret: null,
  };
};
