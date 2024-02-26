import { useTokensStore } from "@/stores/tokens";

export const isTokensStoreLoaded = () => {
    return useTokensStore().loaded;
};
