import axios from "axios";

import { defineStore } from "pinia";

import { authorizationDefaultHeader, authorizationHeader } from "@/authorization";
import { GrantType } from "@/enums";
import { type ForgotData } from "@/models/data/forgot";
import { type RefreshData } from "@/models/data/refresh";
import { type RegisterData } from "@/models/data/register";
import { type ResetData } from "@/models/data/reset";
import { type UserData } from "@/models/data/user";
import { type VerificationData } from "@/models/data/verification";
import { Tokens, tokensTypeFromModel, type TokensType } from "@/models/tokens";

import { type Optional } from "@/typing";

// NOTE: tokens state is persisted, therefore we can not use `Tokens` here
// there are some workarounds, though, but they violate the type system

interface State {
    tokens: Optional<TokensType>;
}

export const useTokensStore = defineStore(
    "token",
    {
        state: (): State => (
            {
                tokens: null,
            }
        ),
        getters: {
            authorized: (state) => state.tokens != null,
            stateTokens: (state) => {
                const tokens = state.tokens;

                if (tokens == null) {
                    throw new Error("tokens are not present");
                }

                return new Tokens(tokens);
            },
        },
        actions: {
            async login(userData: UserData) {
                const {data} = await axios.postForm("/login", userData);

                this.setTokens(tokensTypeFromModel(data));
            },
            async refresh() {
                const refreshTokenData: RefreshData = {
                    grant_type: GrantType.RefreshToken,
                    refresh_token: this.stateTokens.refreshToken,
                }

                const {data} = await axios.postForm("/tokens", refreshTokenData);

                this.setTokens(tokensTypeFromModel(data));
            },
            async logout() {
                const tokens = this.stateTokens;

                this.removeTokens();

                await axios.post("/logout", null, {headers: authorizationHeader(tokens)});
            },
            setTokens(tokens: TokensType) {
                this.tokens = tokens;
            },
            removeTokens() {
                this.tokens = null;
            },
            async register(registerData: RegisterData) {
                await axios.postForm("/register", registerData);
            },
            async verify(verificationData: VerificationData) {
                await axios.postForm("/verify", verificationData);
            },
            async forgot(forgotData: ForgotData) {
                await axios.postForm("/forgot", forgotData);
            },
            async reset(resetData: ResetData) {
                const token = resetData.token;

                const password = resetData.password;

                await axios.postForm(
                    "/reset", {password}, {headers: authorizationDefaultHeader(token)}
                );

                this.removeTokens();
            }
        },
        persist: true,
    }
)
