import { Base, type BaseModel, type BaseType, baseTypeFromModel } from "@/models/base";

export interface TrackedModel extends BaseModel {
    created_at: string;
}

export interface TrackedType extends BaseType {
    createdAt: string;
}

export function trackedTypeFromModel(model: TrackedModel): TrackedType {
    return {
        ...baseTypeFromModel(model),
        createdAt: model.created_at,
    };
}

export class Tracked extends Base {
    createdAt: Date;

    static fromModel(model: TrackedModel) {
        return new this(trackedTypeFromModel(model));
    }

    constructor(tracked: TrackedType) {
        super(tracked);

        this.createdAt = new Date(tracked.createdAt);
    }
}
