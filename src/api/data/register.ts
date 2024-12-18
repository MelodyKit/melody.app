export interface RegisterDataType {
    name: string;
    email: string;
    password: string;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
}

export const registerDataIntoType = (data: RegisterData): RegisterData => {
    return {
        name: data.name,
        email: data.email,
        password: data.password,
    };
};
