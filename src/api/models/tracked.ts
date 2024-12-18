import { Base, type BaseModel, type BaseType, baseTypeFromModel } from "./base.ts";

export interface TrackedModel extends BaseModel {
    created_at: string;
}

export interface TrackedType extends BaseType {
    createdAt: string;
}

export const trackedTypeFromModel = (model: TrackedModel): TrackedType => {
    return {
        ...baseTypeFromModel(model),
        createdAt: model.created_at,
    };
};

export class Tracked extends Base {
    createdAt: Date;

    static override fromModel(model: TrackedModel) {
        return new this(trackedTypeFromModel(model));
    }

    constructor(tracked: TrackedType) {
        super(tracked);

        this.createdAt = new Date(tracked.createdAt);
    }
}
