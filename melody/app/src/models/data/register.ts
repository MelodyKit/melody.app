export interface RegisterDataType {
    name: string | null;
    email: string | null;
    password: string | null;
}

export class RegisterData {
    name: string | null;
    email: string | null;
    password: string | null;

    constructor(registerData: RegisterDataType) {
        this.name = registerData.name;
        this.email = registerData.email;
        this.password = registerData.password;
    }
}
