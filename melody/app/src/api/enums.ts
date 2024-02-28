import { unique } from "@/api/iters";

export enum AlbumType {
    Album = "album",
    Single = "single",
    Compilation = "compilation",
    Default = Album,
}

export type AlbumTypeLiteral = `${AlbumType}`;

export const AlbumTypes = unique(Object.values(AlbumType));

export enum PrivacyType {
    Public = "public",
    Friends = "friends",
    Private = "private",
    Default = Public,
}

export type PrivacyTypeLiteral = `${PrivacyType}`;

export const PrivacyTypes = unique(Object.values(PrivacyType));

export enum Platform {
    Any = "any",
    Spotify = "spotify",
    AppleMusic = "apple_music",
    YandexMusic = "yandex_music",
    Default = Any,
}

export type PlatformLiteral = `${Platform}`;

export const PlatformTypes = unique(Object.values(Platform));

export enum Repeat {
    None = "none",
    Context = "context",
    One = "one",
    Default = None,
}

export type RepeatLiteral = `${Repeat}`;

export const RepeatTypes = unique(Object.values(Repeat));

export const nextRepeat = (repeat: Repeat) => {
    switch (repeat) {
        case Repeat.None:
            return Repeat.Context;
        case Repeat.Context:
            return Repeat.One;
        case Repeat.One:
            return Repeat.None;
    }
};

export enum Volume {
    Off = "off",
    Low = "low",
    Normal = "normal",
    High = "high",
}

export type VolumeLiteral = `${Volume}`;

export const VolumeTypes = unique(Object.values(Volume));

export const getVolume = (volume: number) => {
    if (volume > 0.75) {
        return Volume.High;
    } else if (volume > 0.25) {
        return Volume.Normal;
    } else if (volume > 0.0) {
        return Volume.Low;
    } else {
        return Volume.Off;
    }
};

export enum GrantType {
    AuthorizationCode = "authorization_code",
    ClientCredentials = "client_credentials",
    RefreshToken = "refresh_token",
}

export type GrantTypeLiteral = `${GrantType}`;

export const GrantTypes = unique(Object.values(GrantType));
