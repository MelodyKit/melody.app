export interface ResetDataType {
    token: string | null;
    password: string | null;
    confirm: string | null;
}

export class ResetData {
    token: string | null;
    password: string | null;
    confirm: string | null;

    constructor(data: ResetDataType) {
        this.token = data.token;
        this.password = data.password;
        this.confirm = data.confirm;
    }
}
