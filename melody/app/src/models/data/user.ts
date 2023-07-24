export interface UserDataType {
    email: string | null;
    password: string | null;
}

export class UserData {
    email: string | null;
    password: string | null;

    constructor(userData: UserDataType) {
        this.email = userData.email;
        this.password = userData.password;
    }
}
