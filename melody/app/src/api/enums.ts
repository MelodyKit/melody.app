export enum AlbumType {
    Album = "album",
    Single = "single",
    Compilation = "compilation",
    Default = Album,
}

export type AlbumTypeLiteral = `${AlbumType}`;

export enum PrivacyType {
    Public = "public",
    Friends = "friends",
    Private = "private",
    Default = Public,
}

export type PrivacyTypeLiteral = `${PrivacyType}`;

export enum Platform {
    Any = "any",
    Spotify = "spotify",
    AppleMusic = "apple_music",
    YandexMusic = "yandex_music",
    Default = Any,
}

export type PlatformLiteral = `${Platform}`;

export enum Repeat {
    None = "none",
    Context = "context",
    One = "one",
    Default = None,
}

export type RepeatLiteral = `${Repeat}`;

export function nextRepeat(repeat: Repeat): Repeat {
    switch (repeat) {
        case Repeat.None:
            return Repeat.Context;
        case Repeat.Context:
            return Repeat.One;
        case Repeat.One:
            return Repeat.None;
    }
}

export enum Volume {
    Off = "off",
    Low = "low",
    Normal = "normal",
    High = "high",
}

export type VolumeLiteral = `${Volume}`;

export function getVolume(volume: number): Volume {
    if (volume > 0.75) {
        return Volume.High;
    } else if (volume > 0.25) {
        return Volume.Normal;
    } else if (volume > 0.0) {
        return Volume.Low;
    } else {
        return Volume.Off;
    }
}

export enum GrantType {
    AuthorizationCode = "authorization_code",
    ClientCredentials = "client_credentials",
    RefreshToken = "refresh_token",
}

export type GrantTypeLiteral = `${GrantType}`;
