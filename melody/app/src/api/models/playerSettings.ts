import { Repeat, nextRepeat, type RepeatLiteral, getVolume, Volume } from "@/api/enums";

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

export const playerSettingsTypeFromModel = (model: PlayerSettingsModel): PlayerSettingsType => {
    return {
        playing: model.playing,
        shuffle: model.shuffle,
        repeat: model.repeat as RepeatLiteral, // TODO: validate?
        volume: model.volume,
    };
};

export const DEFAULT_PLAYING = false;
export const DEFAULT_SHUFFLE = false;
export const DEFAULT_REPEAT = Repeat.Default as RepeatLiteral;
export const DEFAULT_VOLUME = 0.5;
export const DISABLE_VOLUME = 0.0;

export class PlayerSettings {
    playing: boolean;
    shuffle: boolean;
    repeat: Repeat;
    volume: number;

    volumeStore: number;

    static fromModel(model: PlayerSettingsModel) {
        return new this(playerSettingsTypeFromModel(model));
    }

    static default() {
        return new this({
            playing: DEFAULT_PLAYING,
            shuffle: DEFAULT_SHUFFLE,
            repeat: DEFAULT_REPEAT,
            volume: DEFAULT_VOLUME,
        });
    }

    constructor(playerSettings: PlayerSettingsType) {
        this.playing = playerSettings.playing;
        this.shuffle = playerSettings.shuffle;
        this.repeat = playerSettings.repeat as Repeat;
        this.volume = playerSettings.volume;
        this.volumeStore = DISABLE_VOLUME;
    }

    togglePlaying() {
        this.playing = !this.playing;
    }

    isPlaying() {
        return this.playing;
    }

    toggleShuffle() {
        this.shuffle = !this.shuffle;
    }

    isShuffle() {
        return this.shuffle;
    }

    cycleRepeat() {
        this.repeat = nextRepeat(this.repeat);
    }

    isRepeat() {
        return this.isRepeatContext() || this.isRepeatOne();
    }

    isRepeatContext() {
        return this.repeat == Repeat.Context;
    }

    isRepeatOne() {
        return this.repeat == Repeat.One;
    }

    toggleVolume() {
        if (!this.volume) {
            this.volume = this.volumeStore;
            this.volumeStore = DISABLE_VOLUME;
        } else {
            this.volumeStore = this.volume;
            this.volume = DISABLE_VOLUME;
        }
    }

    getVolume() {
        return getVolume(this.volume);
    }

    isVolumeOff() {
        return this.getVolume() == Volume.Off;
    }

    isVolumeLow() {
        return this.getVolume() == Volume.Low;
    }

    isVolumeNormal() {
        return this.getVolume() == Volume.Normal;
    }

    isVolumeHigh() {
        return this.getVolume() == Volume.High;
    }
}
