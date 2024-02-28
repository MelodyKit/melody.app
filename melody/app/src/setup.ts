import axios, { AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from "axios";

import { useToast } from "vue-toastification";

import { AUTHORIZATION, authorization } from "@/api/authorization";
import { ErrorCode } from "@/api/codes";
import { isErrorType } from "@/api/models/error";
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
    instance.interceptors.request.use((config) => {
        config.params = { ...config.params, timestamp: Date.now() };

        return config;
    });

    instance.interceptors.response.use(
        (response) => response,
        async (error: AxiosError<any>) => {
            const toast = useToast();

            const response = error.response;

            if (!response) {
                toast.error("no response; unknown error");

                return error;
            }

            const data = response.data;

            if (!isErrorType(data)) {
                toast.error("unknown error");

                return error;
            }

            const code = data.code as ErrorCode;
            const message = data.message;

            if (code == ErrorCode.AuthAccessTokenInvalid) {
                const config = error.config;

                if (!config) {
                    toast.error("config is not present; can not retry");

                    return error;
                }

                const tokens = await refreshTokens();

                return await retryWithRefreshed(config, tokens);
            }

            if (code == ErrorCode.AuthRefreshTokenInvalid) {
                removeTokens();

                toast.error("refresh failed; tokens removed");

                return error;
            }

            toast.error(`${message} (code ${code})`);

            return error;
        },
    );
};

export default setupApi;
