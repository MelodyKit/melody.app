import { Entity, type EntityModel, type EntityType } from "@/models/entity";
import { PrivacyType, type PrivacyTypeLiteral } from "@/models/enums";

export interface UserModel extends EntityModel {
    uri: string;

    follower_count: number;

    stream_count: number;
    stream_duration_ms: number;

    privacy_type: PrivacyTypeLiteral;

    discord_id: string | null;
}

export interface UserType extends EntityType {
    uri: string;

    followerCount: number;

    streamCount: number;
    streamDurationMS: number;

    privacyType: PrivacyTypeLiteral;

    discordId: string | null;
}

export function userTypeFromModel(model: UserModel): UserType {
    return {
        id: model.id,
        createdAt: model.created_at,
        name: model.name,
        spotifyID: model.spotify_id,
        appleMusicID: model.apple_music_id,
        yandexMusicID: model.yandex_music_id,
        uri: model.uri,
        followerCount: model.follower_count,
        streamCount: model.stream_count,
        streamDurationMS: model.stream_duration_ms,
        privacyType: model.privacy_type,
        discordId: model.discord_id,
    };
}

export class User extends Entity {
    uri: string;

    followerCount: number;

    streamCount: number;
    streamDurationMS: number;

    privacyType: PrivacyType;

    discordId: string | null;

    static fromModel(model: UserModel) {
        return new this(userTypeFromModel(model));
    }

    constructor(user: UserType) {
        super(user);

        this.uri = user.uri;

        this.followerCount = user.followerCount;

        this.streamCount = user.streamCount;
        this.streamDurationMS = user.streamDurationMS;

        this.privacyType = user.privacyType as PrivacyType;

        this.discordId = user.discordId;
    }
}
