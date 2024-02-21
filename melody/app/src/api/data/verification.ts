export interface VerificationDataType {
    verification_code: string;
}

export interface VerificationData {
    verificationCode: string;
}

export function verificationDataIntoType(data: VerificationData): VerificationDataType {
    return {
        verification_code: data.verificationCode
    };
}
