import { DEFAULT_PLAYING, DEFAULT_REPEAT_LITERAL, DEFAULT_SHUFFLE, DEFAULT_VOLUME } from "@/api/constants";

import { Repeat, type RepeatLiteral } from "@/api/enums";

export interface PlayerSettingsModel {
    playing: boolean;
    shuffle: boolean;
    repeat: string;
    volume: number;
}

export interface PlayerSettingsType {
    playing: boolean;
    shuffle: boolean;
    repeat: RepeatLiteral;
    volume: number;
}

export function playerSettingsTypeFromModel(model: PlayerSettingsModel): PlayerSettingsType {
    return {
        playing: model.playing,
        shuffle: model.shuffle,
        repeat: model.repeat as RepeatLiteral,  // TODO: validate?
        volume: model.volume,
    };
}

export function defaultPlayerSettingsType(): PlayerSettingsType {
    return {
        playing: DEFAULT_PLAYING,
        shuffle: DEFAULT_SHUFFLE,
        repeat: DEFAULT_REPEAT_LITERAL,
        volume: DEFAULT_VOLUME,
    };
}

export class PlayerSettings {
    playing: boolean;
    shuffle: boolean;
    repeat: Repeat;
    volume: number;

    static fromModel(model: PlayerSettingsModel) {
        return new this(playerSettingsTypeFromModel(model));
    }

    static default() {
        return new this(defaultPlayerSettingsType());
    }

    constructor(playerSettings: PlayerSettingsType) {
        this.playing = playerSettings.playing;
        this.shuffle = playerSettings.shuffle;
        this.repeat = playerSettings.repeat as Repeat;
        this.volume = playerSettings.volume;
    }
}
