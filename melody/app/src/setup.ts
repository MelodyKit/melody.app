import axios, { AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from "axios";

import { AUTHORIZATION, authorization } from "@/api/authorization";
import { ErrorCode } from "@/api/codes";
import { Error as ApiError } from "@/api/models/error";
import { Tokens } from "@/api/models/tokens";

import { useTokensStore } from "@/stores/tokens";

const retryWithRefreshed = async (config: InternalAxiosRequestConfig, tokens: Tokens) => {
    config.headers[AUTHORIZATION] = authorization(tokens);

    return await axios.request(config);
};

const refreshTokens = async () => {
    const store = useTokensStore();

    await store.refresh();

    return store.stateTokens;
};

const removeTokens = () => {
    const store = useTokensStore();

    store.removeTokens();
};

const setupApi = (instance: AxiosInstance) => {
    instance.interceptors.request.use(
        (config) => {
            config.params = {...config.params, timestamp: Date.now()};

            return config;
        }
    );

    instance.interceptors.response.use(
        (response) => response,
        async (error: AxiosError<ApiError>) => {
            const code = error.response?.data.code;

            if (code == ErrorCode.AuthAccessTokenInvalid) {
                const config = error.config;

                if (!config) {
                    throw new Error("config is not present; can not retry");
                }

                const tokens = await refreshTokens();

                return await retryWithRefreshed(config, tokens);
            }

            if (code == ErrorCode.AuthRefreshTokenInvalid) {
                removeTokens();

                throw new Error("refresh failed; tokens removed");
            }

            throw error;
        }
    )
}

export default setupApi;
