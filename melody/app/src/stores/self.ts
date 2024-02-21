import { defineStore } from "pinia";

import { BASE64 } from "@/constants";
import { PlayerSettings } from "@/api/models/playerSettings";
import { User } from "@/api/models/user";
import { UserSettings } from "@/api/models/userSettings";

import { useTokensStore } from "@/stores/tokens";

import { type Nullable } from "@/nullable";

interface State {
    self: Nullable<User>;
    settings: Nullable<UserSettings>;
    playerSettings: Nullable<PlayerSettings>;
    localPlayerSettings: Nullable<PlayerSettings>;
    image: Nullable<string>,
}

export const useSelfStore = defineStore(
    "self",
    {
        state: (): State => (
            {
                self: null,
                settings: null,
                playerSettings: null,
                localPlayerSettings: null,
                image: null,
            }
        ),
        getters: {
            loaded: (state) => state.self != null && state.image != null,
            stateSelf: (state) => {
                const self = state.self;

                if (self == null) {
                    throw new Error("self is not present");
                }

                return self;
            },
            stateSettings: (state) => {
                const settings = state.settings;

                if (settings == null) {
                    throw new Error("settings are not present");
                }

                return settings;
            },
            statePlayerSettings: (state) => {
                const playerSettings = state.playerSettings;

                if (playerSettings == null) {
                    throw new Error("player settings are not present");
                }

                return playerSettings;
            },
            stateLocalPlayerSettings: (state) => {
                const localPlayerSettings = state.localPlayerSettings;

                if (localPlayerSettings == null) {
                    throw new Error("local player settings are not present");
                }

                return localPlayerSettings;
            },
            stateImage: (state) => {
                const image = state.image;

                if (image == null) {
                    throw new Error("image is not present");
                }

                return image;
            },
        },
        actions: {
            async fetchAll() {
                await this.fetchSelf();
                await this.fetchSettings();
                // await this.fetchPlayerSettings();
                await this.fetchImage();
            },
            async fetchSelf() {
                const client = useTokensStore().stateClient;

                const self = await client.fetchSelf();

                this.setSelf(self);
            },
            async fetchSettings() {
                const client = useTokensStore().stateClient;

                const settings = await client.fetchSelfSettings();

                this.setSettings(settings);
            },
            async fetchPlayerSettings() {
                // TODO: implement when the API endpoint becomes available
            },
            async fetchImage() {
                const client = useTokensStore().stateClient;

                const data = await client.fetchSelfImage();

                const image = data.toString(BASE64);

                this.setImage(image);
            },
            ensureLocalPlayerSettings() {
                if (this.localPlayerSettings == null) {
                    this.localPlayerSettings = PlayerSettings.default();
                }
            },
            setSelf(self: User) {
                this.self = self;
            },
            setSettings(settings: UserSettings) {
                this.settings = settings;
            },
            setPlayerSettings(playerSettings: PlayerSettings) {
                this.playerSettings = playerSettings;
            },
            setImage(image: string) {
                this.image = image;
            },
            removeAll() {
                this.removeSelf();
                this.removeSettings();
                this.removePlayerSettings();
                this.removeImage();
            },
            removeSelf() {
                this.self = null;
            },
            removeSettings() {
                this.settings = null;
            },
            removePlayerSettings() {
                this.playerSettings = null;
            },
            removeImage() {
                this.image = null;
            }
        },
    }
)
