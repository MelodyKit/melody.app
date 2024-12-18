import { Tracked, type TrackedModel, type TrackedType, trackedTypeFromModel } from "./tracked.ts";

export interface SimpleModel extends TrackedModel {
    name: string;
}

export interface SimpleType extends TrackedType {
    name: string;
}

export const simpleTypeFromModel = (model: SimpleModel): SimpleType => {
    return {
        ...trackedTypeFromModel(model),
        name: model.name,
    };
};

export class Simple extends Tracked {
    name: string;

    static override fromModel(model: SimpleModel) {
        return new this(simpleTypeFromModel(model));
    }

    constructor(simple: SimpleType) {
        super(simple);

        this.name = simple.name;
    }
}
