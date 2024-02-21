export interface BaseModel {
    id: string;
}

export interface BaseType {
    id: string;
}

export function baseTypeFromModel(model: BaseModel): BaseType {
    return {id: model.id};
}

export class Base {
    id: string;

    static fromModel(model: BaseModel) {
        return new this(baseTypeFromModel(model));
    }

    constructor(base: BaseType) {
        this.id = base.id;
    }
}
