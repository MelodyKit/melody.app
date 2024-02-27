import { Named, type NamedModel, type NamedType, namedTypeFromModel } from "@/api/models/named";

import { type Nullable } from "@/nullable";

export interface EntityModel extends NamedModel {
    spotify_id: Nullable<string>;
    apple_music_id: Nullable<string>;
    yandex_music_id: Nullable<string>;
}

export interface EntityType extends NamedType {
    spotifyId: Nullable<string>;
    appleMusicId: Nullable<string>;
    yandexMusicId: Nullable<string>;
}

export const entityTypeFromModel = (model: EntityModel): EntityType => {
    return {
        ...namedTypeFromModel(model),
        spotifyId: model.spotify_id,
        appleMusicId: model.apple_music_id,
        yandexMusicId: model.yandex_music_id,
    };
};

export class Entity extends Named {
    spotifyId: Nullable<string>;
    appleMusicId: Nullable<string>;
    yandexMusicId: Nullable<string>;

    static fromModel(model: EntityModel) {
        return new this(entityTypeFromModel(model));
    }

    constructor(entity: EntityType) {
        super(entity);

        this.spotifyId = entity.spotifyId;
        this.appleMusicId = entity.appleMusicId;
        this.yandexMusicId = entity.yandexMusicId;
    }
}
