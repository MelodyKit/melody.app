import { Entity, type EntityModel, type EntityType, entityTypeFromModel } from "@/models/entity";
import { PrivacyType, type PrivacyTypeLiteral } from "@/models/enums";

import { type Optional } from "@/typing";

export interface UserModel extends EntityModel {
    follower_count: number;

    stream_count: number;
    stream_duration_ms: number;

    privacy_type: PrivacyTypeLiteral;

    discord_id: Optional<string>;
}

export interface UserType extends EntityType {
    followerCount: number;

    streamCount: number;
    streamDurationMs: number;

    privacyType: PrivacyTypeLiteral;

    discordId: Optional<string>;
}

export function userTypeFromModel(model: UserModel): UserType {
    return {
        ...entityTypeFromModel(model),
        followerCount: model.follower_count,
        streamCount: model.stream_count,
        streamDurationMs: model.stream_duration_ms,
        privacyType: model.privacy_type,
        discordId: model.discord_id,
    };
}

export class User extends Entity {
    followerCount: number;

    streamCount: number;
    streamDurationMs: number;

    privacyType: PrivacyType;

    discordId: string | null;

    static fromModel(model: UserModel) {
        return new this(userTypeFromModel(model));
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
