import axios, { AxiosError } from "axios";

import { createApp } from "vue";
import { createPinia } from "pinia";

import piniaPluginPersistedState from "pinia-plugin-persistedstate";

import App from "@/App.vue";

import router from "@/router";

import { AUTHORIZATION, authorizationAccess } from "@/authorization";
import { useTokensStore } from "@/store/modules/tokens";

const ID = "#app";

const BASE_URL = "https://melodykit.app/api/v1";

const HTTP_UNAUTHORIZED = 401;

axios.defaults.withCredentials = true;
axios.defaults.baseURL = BASE_URL;

axios.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<any>) => {
        if (error.response?.status != HTTP_UNAUTHORIZED) {
            throw error;
        }

        const store = useTokensStore();

        await store.refresh();

        const config = error.config;

        if (config) {
            config.headers[AUTHORIZATION] = authorizationAccess(store.stateTokens);

            return await axios.request(config);
        } else {
            throw new Error("config is not present");
        }
    }
);

const pinia = createPinia();

pinia.use(piniaPluginPersistedState);

const app = createApp(App);

app.use(router);

app.use(pinia);

app.mount(ID);
