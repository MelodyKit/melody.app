import { Entity, type EntityModel, type EntityType, entityTypeFromModel } from "@/models/entity";
import { PrivacyType, type PrivacyTypeLiteral } from "@/models/enums";
import { User, type UserModel, type UserType, userTypeFromModel } from "@/models/user";
import { type Optional } from "@/typing";

export interface PlaylistModel extends EntityModel {
    owner: Optional<UserModel>;

    follower_count: number;

    description: Optional<string>;

    duration_ms: number;

    track_count: number;

    privacy_type: PrivacyTypeLiteral;
}

export interface PlaylistType extends EntityType {
    owner: Optional<UserType>;

    followerCount: number;

    description: Optional<string>;

    durationMs: number;

    trackCount: number;

    privacyType: PrivacyTypeLiteral;
}

export function playlistTypeFromModel(model: PlaylistModel): PlaylistType {
    const ownerModel = model.owner;

    const owner = ownerModel ? userTypeFromModel(ownerModel) : null;

    return {
        ...entityTypeFromModel(model),
        owner: owner,
        followerCount: model.follower_count,
        description: model.description,
        durationMs: model.duration_ms,
        trackCount: model.track_count,
        privacyType: model.privacy_type,
    };
}

export class Playlist extends Entity {
    owner: Optional<User>;

    followerCount: number;

    description: Optional<string>;

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
