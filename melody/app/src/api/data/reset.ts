export interface ResetDataType {
    password: string;
}

export interface ResetData {
    password: string;
}

export const resetDataIntoType = (data: ResetData): ResetDataType => {
    return {
        password: data.password,
    };
};

export type ResetDataAndToken = readonly [ResetData, string];
