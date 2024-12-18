export interface AuthorizeDataType {
    client_id: string;
    redirect_uri: string;
    scope: string;
    state: string;
}

export interface AuthorizeData {
    clientId: string;
    redirectUri: string;
    scope: string;
    state: string;
}

export const authorizeDataIntoType = (data: AuthorizeData): AuthorizeDataType => {
    return {
        client_id: data.clientId,
        redirect_uri: data.redirectUri,
        scope: data.scope,
        state: data.state,
    };
};
