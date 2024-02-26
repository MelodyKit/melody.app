import axios from "axios";

import { Buffer } from "buffer";

import { API_URL, ARRAY_BUFFER, BINARY } from "@/api/constants";

import { AuthorizationCode } from "@/api/models/code";
import { Client } from "@/api/models/client";
import { Tokens } from "@/api/models/tokens";
import { User } from "@/api/models/user";
import { UserSettings } from "@/api/models/userSettings";

import { authorizeDataIntoType, type AuthorizeData } from "@/api/data/authorize";
import { forgotDataIntoType, type ForgotData } from "@/api/data/forgot";
import { loginDataIntoType, type LoginData } from "@/api/data/login";
import { registerDataIntoType, type RegisterData } from "@/api/data/register";
import { resetDataIntoType, type ResetData } from "@/api/data/reset";
import {
    tokensDataIntoType,
    type TokensData,
    type RefreshTokenData,
    refreshTokenDataIntoData,
} from "@/api/data/tokens";
import { userSettingsDataIntoType, type UserSettingsData } from "@/api/data/userSettings";
import { verificationDataIntoType, type VerificationData } from "@/api/data/verification";

import { authorizationDefaultHeader, authorizationHeader } from "@/api/authorization";

import { type Nullable } from "@/nullable";

const instance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

export class ClientContainer {
    nullableTokens: Nullable<Tokens>;

    get tokens() {
        const tokens = this.nullableTokens;

        if (tokens == null) {
            throw new Error("tokens are not attached");
        }

        return tokens;
    }

    constructor(nullableTokens: Nullable<Tokens> = null) {
        this.nullableTokens = nullableTokens;
    }

    async login(loginData: LoginData) {
        const {data} = await instance.postForm("/login", loginDataIntoType(loginData));

        return Tokens.fromModel(data);
    }

    async authorize(authorizeData: AuthorizeData) {
        const {data} = await instance.postForm(
            "/authorize",
            authorizeDataIntoType(authorizeData),
            {headers: authorizationHeader(this.tokens)},
        );

        return AuthorizationCode.fromModel(data);
    }

    async revoke() {
        await instance.post("/revoke", null, {headers: authorizationHeader(this.tokens)});
    }

    async revokeAll() {
        await instance.post("/revoke-all", null, {headers: authorizationHeader(this.tokens)});
    }

    async register(registerData: RegisterData) {
        await instance.postForm("/register", registerDataIntoType(registerData));
    }

    async verify(verificationData: VerificationData) {
        await instance.postForm("/verify", verificationDataIntoType(verificationData));
    }

    async forgot(forgotData: ForgotData) {
        await instance.postForm("/forgot", forgotDataIntoType(forgotData));
    }

    async reset(resetData: ResetData, token: string) {
        await instance.postForm(
            "/reset", resetDataIntoType(resetData), {headers: authorizationDefaultHeader(token)}
        );
    }

    async fetchTokens(tokensData: TokensData) {
        const {data} = await instance.postForm("/tokens", tokensDataIntoType(tokensData));

        return Tokens.fromModel(data);
    }

    async refresh() {
        const refreshTokenData: RefreshTokenData = {
            refreshToken: this.tokens.refreshToken
        };

        return await this.fetchTokens(refreshTokenDataIntoData(refreshTokenData));
    }

    async fetchSelf() {
        const {data} = await instance.get("/me", {headers: authorizationHeader(this.tokens)});

        return User.fromModel(data);
    }

    async fetchSelfImage() {
        const {data} = await instance.get(
            "/me/image", {headers: authorizationHeader(this.tokens), responseType: ARRAY_BUFFER}
        );

        return Buffer.from(data, BINARY);
    }

    async fetchSelfSettings() {
        const {data} = await instance.get(
            "/me/settings", {headers: authorizationHeader(this.tokens)}
        );

        return UserSettings.fromModel(data);
    }

    async updateSelfSettings(userSettingsData: UserSettingsData) {
        await instance.put(
            "/me/settings",
            userSettingsDataIntoType(userSettingsData),
            {headers: authorizationHeader(this.tokens)},
        );
    }

    async fetchClient(clientId: string) {
        const {data} = await instance.get(
            `/clients/${clientId}`, {headers: authorizationHeader(this.tokens)}
        );

        return Client.fromModel(data);
    }
}

export default instance;
