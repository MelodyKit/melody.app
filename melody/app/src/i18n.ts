import { createI18n } from "vue-i18n";

const DEFAULT_LOCALE = "en";

const MESSAGES = {};

const i18n = createI18n({
    fallbackLocale: DEFAULT_LOCALE,
    messages: MESSAGES,
    legacy: false,
});

export default i18n;
