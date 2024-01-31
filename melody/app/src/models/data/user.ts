export interface UserDataType {
    email: string | null;
    password: string | null;
    code: string | null;
}

export class UserData {
    email: string | null;
    password: string | null;
    code: string | null;

    constructor(userData: UserDataType) {
        this.email = userData.email;
        this.password = userData.password;
        this.code = userData.code;
    }
}
