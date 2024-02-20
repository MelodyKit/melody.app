import axios, { AxiosError } from "axios";

import { createApp } from "vue";
import { createPinia } from "pinia";

import { createI18n } from "vue-i18n";

import piniaPluginPersistedState from "pinia-plugin-persistedstate";

import Toast from "vue-toastification";

import "@/style.css";

import App from "@/App.vue";

import router from "@/router";

import { AUTHORIZATION, authorization } from "@/authorization";
import { API_URL, FALLBACK_LOCALE } from "@/constants";
import { ErrorCode } from "@/errors";
import { MESSAGES } from "@/messages";
import { useTokensStore } from "@/stores/tokens";

const ID = "#app";

const TOKENS = "/tokens";
const REFRESH_TOKEN = "refresh_token";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = API_URL;
axios.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<any>) => {
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

const i18n = createI18n({
    legacy: false
});

const pinia = createPinia();

pinia.use(piniaPluginPersistedState);

const app = createApp(App);

app.use(Toast);

app.use(i18n);

app.use(router);

app.use(pinia);

app.mount(ID);
