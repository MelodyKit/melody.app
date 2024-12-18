import type { Nullable } from "../nullable.ts";

import { Simple, type SimpleModel, type SimpleType, simpleTypeFromModel } from "./simple.ts";

export interface EntityModel extends SimpleModel {
    spotify_id: Nullable<string>;
    apple_music_id: Nullable<string>;
    yandex_music_id: Nullable<string>;
}

export interface EntityType extends SimpleType {
    spotifyId: Nullable<string>;
    appleMusicId: Nullable<string>;
    yandexMusicId: Nullable<string>;
}

export const entityTypeFromModel = (model: EntityModel): EntityType => {
    return {
        ...simpleTypeFromModel(model),
        spotifyId: model.spotify_id,
        appleMusicId: model.apple_music_id,
        yandexMusicId: model.yandex_music_id,
    };
};

export class Entity extends Simple {
    spotifyId: Nullable<string>;
    appleMusicId: Nullable<string>;
    yandexMusicId: Nullable<string>;

    static override fromModel(model: EntityModel) {
        return new this(entityTypeFromModel(model));
    }

    constructor(entity: EntityType) {
        super(entity);

        this.spotifyId = entity.spotifyId;
        this.appleMusicId = entity.appleMusicId;
        this.yandexMusicId = entity.yandexMusicId;
    }
}
