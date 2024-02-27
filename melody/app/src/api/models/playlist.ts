import { PrivacyType, type PrivacyTypeLiteral } from "@/api/enums";

import { Entity, type EntityModel, type EntityType, entityTypeFromModel } from "@/api/models/entity";
import { User, type UserModel, type UserType, userTypeFromModel } from "@/api/models/user";

import { type Nullable } from "@/nullable";

export interface PlaylistModel extends EntityModel {
    owner: Nullable<UserModel>;

    follower_count: number;

    description: Nullable<string>;

    duration_ms: number;

    track_count: number;

    privacy_type: string;
}

export interface PlaylistType extends EntityType {
    owner: Nullable<UserType>;

    followerCount: number;

    description: Nullable<string>;

    durationMs: number;

    trackCount: number;

    privacyType: PrivacyTypeLiteral;
}

export const playlistTypeFromModel = (model: PlaylistModel): PlaylistType => {
    const ownerModel = model.owner;

    const owner = ownerModel ? userTypeFromModel(ownerModel) : null;

    return {
        ...entityTypeFromModel(model),
        owner: owner,
        followerCount: model.follower_count,
        description: model.description,
        durationMs: model.duration_ms,
        trackCount: model.track_count,
        privacyType: model.privacy_type as PrivacyTypeLiteral,  // TODO: validate?
    };
};

export class Playlist extends Entity {
    owner: Nullable<User>;

    followerCount: number;

    description: Nullable<string>;

    durationMs: number;

    trackCount: number;

    privacyType: PrivacyType;

    static fromModel(model: PlaylistModel) {
        return new this(playlistTypeFromModel(model));
    }

    constructor(playlist: PlaylistType) {
        super(playlist);

        const ownerType = playlist.owner;

        this.owner = ownerType ? new User(ownerType) : null;

        this.followerCount = playlist.followerCount;
        this.description = playlist.description;
        this.durationMs = playlist.durationMs;
        this.trackCount = playlist.trackCount;
        this.privacyType = playlist.privacyType as PrivacyType;
    }
}
