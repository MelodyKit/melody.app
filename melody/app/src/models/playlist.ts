import { Entity, type EntityModel, type EntityType } from "@/models/entity";
import { PrivacyType, type PrivacyTypeLiteral } from "@/models/enums";
import { User, type UserModel, type UserType, userTypeFromModel } from "@/models/user";

export interface PartialPlaylistModel extends EntityModel {
    uri: string;

    follower_count: number;

    description: string | null;

    duration_ms: number;

    track_count: number;

    privacy_type: PrivacyTypeLiteral;
}

export interface PartialPlaylistType extends EntityType {
    uri: string;

    followerCount: number;

    description: string | null;

    durationMs: number;

    trackCount: number;

    privacyType: PrivacyTypeLiteral;
}

export function partialPlaylistTypeFromModel(model: PartialPlaylistModel): PartialPlaylistType {
    return {
        id: model.id,
        createdAt: model.created_at,
        name: model.name,
        spotifyId: model.spotify_id,
        appleMusicId: model.apple_music_id,
        yandexMusicId: model.yandex_music_id,
        uri: model.uri,
        followerCount: model.follower_count,
        description: model.description,
        durationMs: model.duration_ms,
        trackCount: model.track_count,
        privacyType: model.privacy_type,
    };
}

export class PartialPlaylist extends Entity {
    uri: string;

    followerCount: number;

    description: string | null;

    durationMs: number;

    trackCount: number;

    privacyType: PrivacyTypeLiteral;

    static fromModel(model: PartialPlaylistModel) {
        return new this(partialPlaylistTypeFromModel(model));
    }

    constructor(playlist: PartialPlaylistType) {
        super(playlist);

        this.uri = playlist.uri;
        this.followerCount = playlist.followerCount;
        this.description = playlist.description;
        this.durationMs = playlist.durationMs;
        this.trackCount = playlist.trackCount;
        this.privacyType = playlist.privacyType as PrivacyType;
    }
}

export interface PlaylistModel extends PartialPlaylistModel {
    user: UserModel;
}

export interface PlaylistType extends PartialPlaylistType {
    user: UserType;
}

export function playlistTypeFromModel(model: PlaylistModel): PlaylistType {
    return {
        id: model.id,
        createdAt: model.created_at,
        name: model.name,
        spotifyId: model.spotify_id,
        appleMusicId: model.apple_music_id,
        yandexMusicId: model.yandex_music_id,
        uri: model.uri,
        followerCount: model.follower_count,
        description: model.description,
        durationMs: model.duration_ms,
        trackCount: model.track_count,
        privacyType: model.privacy_type,
        user: userTypeFromModel(model.user),
    };
}

export class Playlist extends PartialPlaylist {
    user: User;

    static fromModel(model: PlaylistModel) {
        return new this(playlistTypeFromModel(model));
    }

    constructor(playlist: PlaylistType) {
        super(playlist);

        this.user = new User(playlist.user);
    }
}
