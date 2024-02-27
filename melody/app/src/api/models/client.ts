import { Named, type NamedModel, type NamedType, namedTypeFromModel } from "@/api/models/named";

import type { Nullable } from "@/nullable";

export interface ClientModel extends NamedModel {
    creator: NamedModel;
    description: Nullable<string>;
}

export interface ClientType extends NamedType {
    creator: NamedType;
    description: Nullable<string>;
}

export const clientTypeFromModel = (model: ClientModel): ClientType => {
    return {
        ...namedTypeFromModel(model),
        creator: namedTypeFromModel(model.creator),
        description: model.description,
    };
};

export class Client extends Named {
    creator: Named;
    description: Nullable<string>;

    static fromModel(model: ClientModel) {
        return new this(clientTypeFromModel(model));
    }

    constructor(client: ClientType) {
        super(client);

        this.creator = new Named(client.creator);
        this.description = client.description;
    }
}
