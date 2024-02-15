import axios from "axios";

import { Buffer } from "buffer";

import { defineStore } from "pinia";

import { authorizationHeader } from "@/authorization";
import { ARRAY_BUFFER, BASE64, BINARY } from "@/constants";
import { PlayerSettings } from "@/models/playerSettings";
import { User } from "@/models/user";
import { UserSettings } from "@/models/userSettings";

import { useTokensStore } from "@/stores/tokens";

import { type Optional } from "@/typing";

interface State {
    self: Optional<User>;
    settings: Optional<UserSettings>;
    playerSettings: Optional<PlayerSettings>;
    localPlayerSettings: Optional<PlayerSettings>;
    image: Optional<string>,
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
                const tokens = useTokensStore().stateTokens;

                const {data} = await axios.get("/me", {headers: authorizationHeader(tokens)});

                const self = User.fromModel(data);

                this.setSelf(self);
            },
            async fetchSettings() {
                const tokens = useTokensStore().stateTokens;

                const {data} = await axios.get("/me/settings", {headers: authorizationHeader(tokens)});

                const settings = UserSettings.fromModel(data);

                this.setSettings(settings);
            },
            async fetchPlayerSettings() {
                const tokens = useTokensStore().stateTokens;

                const {data} = await axios.get(
                    "/me/player/settings", {headers: authorizationHeader(tokens)}
                );

                const playerSettings = PlayerSettings.fromModel(data);

                this.setPlayerSettings(playerSettings);
            },
            async fetchImage() {
                const tokens = useTokensStore().stateTokens;

                const {data} = await axios.get(
                    "/me/image", {headers: authorizationHeader(tokens), responseType: ARRAY_BUFFER}
                );

                const image = Buffer.from(data, BINARY).toString(BASE64);

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
