import { Named, type NamedModel, type NamedType, namedTypeFromModel } from "@/models/named";

import { type Optional } from "@/typing";

export interface EntityModel extends NamedModel {
    spotify_id: Optional<string>;
    apple_music_id: Optional<string>;
    yandex_music_id: Optional<string>;
}

export interface EntityType extends NamedType {
    spotifyId: Optional<string>;
    appleMusicId: Optional<string>;
    yandexMusicId: Optional<string>;
}

export function entityTypeFromModel(model: EntityModel): EntityType {
    return {
        ...namedTypeFromModel(model),
        spotifyId: model.spotify_id,
        appleMusicId: model.apple_music_id,
        yandexMusicId: model.yandex_music_id,
    };
}

export class Entity extends Named {
    spotifyId: string | null;
    appleMusicId: string | null;
    yandexMusicId: string | null;

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
