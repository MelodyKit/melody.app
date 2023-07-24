export interface ForgotDataType {
    email: string | null;
}

export class ForgotData {
    email: string | null;

    constructor(forgotData: ForgotDataType) {
        this.email = forgotData.email;
    }
}
