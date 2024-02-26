import "@/style.css";

import app from "@/app";
import i18n from "@/i18n";
import pinia from "@/pinia";
import router from "@/router";
import toast from "@/toast";

import instance from "@/api/client";
import setupApi from "@/setup";

setupApi(instance);

const ID = "#app";

app.use(toast);

app.use(i18n);

app.use(pinia);

app.use(router);

app.mount(ID);
