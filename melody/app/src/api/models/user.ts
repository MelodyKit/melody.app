import { PrivacyType, type PrivacyTypeLiteral } from "@/api/enums";

import {
    Entity,
    type EntityModel,
    type EntityType,
    entityTypeFromModel,
} from "@/api/models/entity";

import { type Nullable } from "@/nullable";

export interface UserModel extends EntityModel {
    follower_count: number;

    stream_count: number;
    stream_duration_ms: number;

    privacy_type: string;

    discord_id: Nullable<string>;
}

export interface UserType extends EntityType {
    followerCount: number;

    streamCount: number;
    streamDurationMs: number;

    privacyType: PrivacyTypeLiteral;

    discordId: Nullable<string>;
}

export const userTypeFromModel = (model: UserModel): UserType => {
    return {
        ...entityTypeFromModel(model),
        followerCount: model.follower_count,
        streamCount: model.stream_count,
        streamDurationMs: model.stream_duration_ms,
        privacyType: model.privacy_type as PrivacyTypeLiteral, // TODO: validate?
        discordId: model.discord_id,
    };
};

export class User extends Entity {
    followerCount: number;

    streamCount: number;
    streamDurationMs: number;

    privacyType: PrivacyType;

    discordId: Nullable<string>;

    static fromModel(model: UserModel): User {
        return new User(userTypeFromModel(model));
    }

    constructor(user: UserType) {
        super(user);

        this.followerCount = user.followerCount;
        this.streamCount = user.streamCount;
        this.streamDurationMs = user.streamDurationMs;
        this.privacyType = user.privacyType as PrivacyType;
        this.discordId = user.discordId;
    }
}
