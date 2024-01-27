import axios, { AxiosError } from "axios";

import { createApp } from "vue";
import { createPinia } from "pinia";

import piniaPluginPersistedState from "pinia-plugin-persistedstate";

import App from "@/App.vue";

import router from "@/router";

import { AUTHORIZATION, authorizationAccess } from "@/authorization";
import { ErrorCode } from "@/errors";
import { useTokensStore } from "@/store/modules/tokens";

const ID = "#app";

const BASE_URL = "https://melodykit.app/api/v1";

const HTTP_UNAUTHORIZED = 401;
const REFRESH = "/refresh";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = BASE_URL;
axios.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<any>) => {
        if (error.response?.data.code != ErrorCode.AuthenticationNotFound) {
            throw error;
        }

        const config = error.config;

        if (config) {
            const store = useTokensStore();

            if (config.url == REFRESH) {
                store.removeTokens();

                throw new Error("refresh failed; tokens removed");
            }

            await store.refresh();

            config.headers[AUTHORIZATION] = authorizationAccess(store.stateTokens);

            return await axios.request(config);
        }

        throw new Error("config is not present; can not retry");
    }
)

const pinia = createPinia();

pinia.use(piniaPluginPersistedState);

const app = createApp(App);

app.use(router);

app.use(pinia);

app.mount(ID);
