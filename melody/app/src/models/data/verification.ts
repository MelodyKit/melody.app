export interface VerificationDataType {
    verificationToken: string | null;
}

export class VerificationData {
    verificationToken: string | null;

    constructor(userData: VerificationDataType) {
        this.verificationToken = userData.verificationToken;
    }
}
