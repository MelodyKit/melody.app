import axios from "axios";

import { defineStore } from "pinia";

import type { UserData } from "@/models/data/user";
import type { RegisterData } from "@/models/data/register";
import type { VerificationData } from "@/models/data/verification";
import type { ForgotData } from "@/models/data/forgot";
import { Tokens, tokensTypeFromModel, type TokensType } from "@/models/tokens";
import {
    authorizationAccessHeader, authorizationDefaultHeader, authorizationRefreshHeader
} from "@/store/utils";
import type { ResetData } from "@/models/data/reset";

interface State {
    tokens: TokensType | null;
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
                const token = state.tokens;

                if (token == null) {
                    throw new Error("token is not present");
                }

                return new Tokens(token);
            },
        },
        actions: {
            async login(userData: UserData) {
                let {data} = await axios.post("/login", userData);

                let tokens = tokensTypeFromModel(data);

                this.setTokens(tokens);
            },
            async refresh() {
                let tokens = this.stateTokens;

                let {data} = await axios.post(
                    "/refresh", null, {headers: authorizationRefreshHeader(tokens)}
                );

                let newTokens = tokensTypeFromModel(data);

                this.setTokens(newTokens);
            },
            async logout() {
                let tokens = this.stateTokens;

                this.removeTokens();

                await axios.post("/logout", null, {headers: authorizationAccessHeader(tokens)});
            },
            setTokens(tokens: TokensType) {
                this.tokens = tokens;
            },
            removeTokens() {
                this.tokens = null;
            },
            async register(registerData: RegisterData) {
                await axios.post("/register", registerData);
            },
            async verify(verificationData: VerificationData) {
                await axios.post(`/verify/${verificationData.verificationToken}`, null);
            },
            async forgot(forgotData: ForgotData) {
                await axios.post("/forgot", forgotData);
            },
            async reset(resetData: ResetData) {
                const token = resetData.token;

                if (token == null) {
                    throw new Error("token is not present");
                }

                const password = resetData.password;
                const confirm = resetData.confirm;

                if (password != confirm) {
                    throw new Error("password mismatch");
                }

                await axios.post(
                    "/reset", {password: password}, {headers: authorizationDefaultHeader(token)}
                );

                this.removeTokens();
            }
        },
        persist: true,
    }
)
