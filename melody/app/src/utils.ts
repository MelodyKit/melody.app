import { useSelfStore } from "@/store/modules/self";
import { useTokensStore } from "@/store/modules/tokens";

export const isApp = () => {
    // @ts-ignore
    return Boolean(window.__TAURI_METADATA__);
}

export const isAuthorized = () => {
    return useTokensStore().authorized;
}

export const isLoaded = () => {
    return useSelfStore().loaded;
}
