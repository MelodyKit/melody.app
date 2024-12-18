import axios from "axios";

import { authorizationHeader } from "./authorization.ts";
import { API_URL } from "./constants.ts";

import { AuthorizationCode } from "./models/code.ts";
import { Tokens } from "./models/tokens.ts";
import { User } from "./models/user.ts";

import { type AuthorizeData, authorizeDataIntoType } from "./data/authorize.ts";
import { type LoginData, loginDataIntoType } from "./data/login.ts";
import {
  type RefreshTokenData,
  refreshTokenDataIntoData,
  type TokensData,
  tokensDataIntoType,
} from "./data/tokens.ts";

export const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const fetchTokens = async (tokensData: TokensData) => {
  const { data } = await instance.postForm(
    "/tokens",
    tokensDataIntoType(tokensData),
  );

  return Tokens.fromModel(data);
};

export const getLogin = async (loginData: LoginData) => {
  const { data } = await instance.postForm(
    "/login",
    loginDataIntoType(loginData),
  );

  return Tokens.fromModel(data);
};

export class ClientInstance {
  tokens: Tokens;

  static async getTokens(tokensData: TokensData) {
    const tokens = await fetchTokens(tokensData);

    return new this(tokens);
  }

  static async login(loginData: LoginData) {
    const tokens = await getLogin(loginData);

    return new this(tokens);
  }

  constructor(tokens: Tokens) {
    this.tokens = tokens;
  }

  async authorize(authorizeData: AuthorizeData) {
    const { data } = await instance.postForm(
      "/authorize",
      authorizeDataIntoType(authorizeData),
      { headers: authorizationHeader(this.tokens) },
    );

    return AuthorizationCode.fromModel(data);
  }

  async refresh() {
    const refreshTokenData: RefreshTokenData = {
      refreshToken: this.tokens.refreshToken,
    };

    const tokens = await fetchTokens(
      refreshTokenDataIntoData(refreshTokenData),
    );

    this.tokens = tokens;
  }

  async getUser(userId: string) {
    const { data } = await instance.get(
      `/users/${userId}`,
      { headers: authorizationHeader(this.tokens) },
    );

    return User.fromModel(data);
  }

  async getUserByTag(tag: string) {
    const { data } = await instance.get(
      `/users/@${tag}`,
      { headers: authorizationHeader(this.tokens) },
    );

    return User.fromModel(data);
  }
}
