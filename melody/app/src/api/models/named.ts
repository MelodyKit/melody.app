import { type TrackedModel, type TrackedType, Tracked, trackedTypeFromModel } from "@/api/models/tracked";

export interface NamedModel extends TrackedModel {
    name: string;
}

export interface NamedType extends TrackedType {
    name: string;
}

export function namedTypeFromModel(model: NamedModel): NamedType {
    return {
        ...trackedTypeFromModel(model),
        name: model.name,
    };
}

export class Named extends Tracked {
    name: string;

    static fromModel(model: NamedModel) {
        return new this(namedTypeFromModel(model));
    }

    constructor(named: NamedType) {
        super(named);

        this.name = named.name;
    }
}
