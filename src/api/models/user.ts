import type { Nullable } from "../nullable.ts";

import { Entity, type EntityModel, type EntityType, entityTypeFromModel } from "./entity.ts";

export interface UserModel extends EntityModel {
    tag: Nullable<string>;
    private: boolean;
    follower_count: number;
    discord_id: Nullable<string>;
}

export interface UserType extends EntityType {
    tag: Nullable<string>;
    private: boolean;
    followerCount: number;
    discordId: Nullable<string>;
}

export const userTypeFromModel = (model: UserModel): UserType => {
    return {
        ...entityTypeFromModel(model),
        tag: model.tag,
        private: model.private,
        followerCount: model.follower_count,
        discordId: model.discord_id,
    };
};

export class User extends Entity {
    tag: Nullable<string>;
    private: boolean;
    followerCount: number;
    discordId: Nullable<string>;

    static override fromModel(model: UserModel): User {
        return new this(userTypeFromModel(model));
    }

    constructor(user: UserType) {
        super(user);

        this.tag = user.tag;
        this.private = user.private;
        this.followerCount = user.followerCount;
        this.discordId = user.discordId;
    }
}
