import { CreatedAt, type CreatedAtModel, type CreatedAtType } from "@/models/createdAt";

export interface EntityModel extends CreatedAtModel {
    name: string;

    spotify_id: string | null;
    apple_music_id: string | null;
    yandex_music_id: string | null;
}

export interface EntityType extends CreatedAtType {
    name: string;

    spotifyId: string | null;
    appleMusicId: string | null;
    yandexMusicId: string | null;
}

export function entityTypeFromModel(model: EntityModel): EntityType {
    return {
        id: model.id,
        createdAt: model.created_at,
        name: model.name,
        spotifyId: model.spotify_id,
        appleMusicId: model.apple_music_id,
        yandexMusicId: model.yandex_music_id,
    };
}

export class Entity extends CreatedAt {
    name: string;

    spotifyId: string | null;
    appleMusicId: string | null;
    yandexMusicId: string | null;

    static fromModel(model: EntityModel) {
        return new this(entityTypeFromModel(model));
    }

    constructor(entity: EntityType) {
        super(entity);

        this.name = entity.name;

        this.spotifyId = entity.spotifyId;
        this.appleMusicId = entity.appleMusicId;
        this.yandexMusicId = entity.yandexMusicId;
    }
}
