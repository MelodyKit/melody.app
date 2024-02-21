import axios, { AxiosError } from "axios";

import { createApp } from "vue";
import { createPinia } from "pinia";

import { createI18n } from "vue-i18n";

import piniaPluginPersistedState from "pinia-plugin-persistedstate";

import Toast from "vue-toastification";

import "@/style.css";

import App from "@/App.vue";

import router from "@/router";

import { instance } from "@/api/client";
import { ErrorCode } from "@/api/codes";
import { Error as APIError } from "@/api/models/error";

import { AUTHORIZATION, authorization } from "@/api/authorization";

import { useTokensStore } from "@/stores/tokens";

import { DEFAULT_LOCALE, MESSAGES } from "@/i18n";

instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<APIError>) => {
        const code = error.response?.data.code;

        if (code == ErrorCode.AuthAccessTokenInvalid) {
            const config = error.config;

            if (!config) {
                throw new Error("config is not present; can not retry");
            }

            const store = useTokensStore();

            await store.refresh();

            config.headers[AUTHORIZATION] = authorization(store.stateTokens);

            return await axios.request(config);
        }

        if (code == ErrorCode.AuthRefreshTokenInvalid) {
            const store = useTokensStore();

            store.removeTokens();

            throw new Error("refresh failed; tokens removed");
        }

        throw error;
    }
)

const ID = "#app";

const i18n = createI18n({
    fallbackLocale: DEFAULT_LOCALE,
    messages: MESSAGES,
    legacy: false,
});

const pinia = createPinia();

pinia.use(piniaPluginPersistedState);

const app = createApp(App);

app.use(Toast);

app.use(i18n);

app.use(router);

app.use(pinia);

app.mount(ID);
