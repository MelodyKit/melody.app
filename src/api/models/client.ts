import { Simple, type SimpleModel, type SimpleType, simpleTypeFromModel } from "./simple.ts";
import type { Nullable } from "../nullable.ts";

export interface ClientModel extends SimpleModel {
    owner: SimpleModel;
    description: Nullable<string>;
}

export interface ClientType extends SimpleType {
    owner: SimpleType;
    description: Nullable<string>;
}

export const clientTypeFromModel = (model: ClientModel): ClientType => {
    return {
        ...simpleTypeFromModel(model),
        owner: simpleTypeFromModel(model.owner),
        description: model.description,
    };
};

export class Client extends Simple {
    owner: Simple;
    description: Nullable<string>;

    static override fromModel(model: ClientModel) {
        return new this(clientTypeFromModel(model));
    }

    constructor(client: ClientType) {
        super(client);

        this.owner = new Simple(client.owner);
        this.description = client.description;
    }
}
