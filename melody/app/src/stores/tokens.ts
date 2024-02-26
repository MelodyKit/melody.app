import { defineStore } from "pinia";

import { ClientContainer } from "@/api/client";

import { type LoginData } from "@/api/data/login";
import { type ResetDataAndToken } from "@/api/data/reset";

import { Tokens } from "@/api/models/tokens";

import { type Nullable } from "@/nullable";

interface State {
    tokens: Nullable<Tokens>;
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
            loaded: (state) => state.tokens != null,
            stateTokens: (state) => {
                const tokens = state.tokens;

                if (tokens == null) {
                    throw new Error("tokens are not present");
                }

                return tokens;
            },
            stateClient: (state) => {
                return new ClientContainer(state.tokens);
            }
        },
        actions: {
            async login(loginData: LoginData) {
                const client = this.stateClient;

                const tokens = await client.login(loginData);

                this.setTokens(tokens);
            },
            async refresh() {
                const client = this.stateClient;

                const tokens = await client.refresh();

                this.setTokens(tokens);
            },
            async revoke() {
                const client = this.stateClient;

                await client.revoke();

                this.removeTokens();
            },
            async reset(resetDataAndToken: ResetDataAndToken) {
                const [resetData, token] = resetDataAndToken;

                const client = this.stateClient;

                await client.reset(resetData, token);

                this.removeTokens();
            },
            setTokens(tokens: Tokens) {
                this.tokens = tokens;
            },
            removeTokens() {
                this.tokens = null;
            },
        },
        persist: {
            serializer: {
                serialize: (state) => JSON.stringify(state.tokens),
                deserialize: (data) => {
                    const tokens = new Tokens(JSON.parse(data));

                    return {tokens};
                },
            }
        }
    }
)
