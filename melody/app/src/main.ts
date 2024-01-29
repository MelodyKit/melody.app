import axios, { AxiosError } from "axios";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { createHead } from "@unhead/vue";

import piniaPluginPersistedState from "pinia-plugin-persistedstate";

import App from "@/App.vue";

import router from "@/router";

import { AUTHORIZATION, authorizationAccess } from "@/authorization";
import { API_URL } from "@/constants";
import { ErrorCode } from "@/errors";
import { useTokensStore } from "@/stores/tokens";

const ID = "#app";

const REFRESH = "/refresh";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = API_URL;
axios.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<any>) => {
        if (error.response?.data.code != ErrorCode.AuthenticationNotFound) {
            throw error;
        }

        const config = error.config;

        if (!config) {
            throw new Error("config is not present; can not retry");
        }

        const store = useTokensStore();

        if (config.url == REFRESH) {
            store.removeTokens();

            throw new Error("refresh failed; tokens removed");
        }

        await store.refresh();

        config.headers[AUTHORIZATION] = authorizationAccess(store.stateTokens);

        return await axios.request(config);
    }
)

const pinia = createPinia();

pinia.use(piniaPluginPersistedState);

const head = createHead();

const app = createApp(App);

app.use(head);

app.use(router);

app.use(pinia);

app.mount(ID);
