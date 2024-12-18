export interface VerificationDataType {
    verification_code: string;
}

export interface VerificationData {
    verificationCode: string;
}

export const verificationDataIntoType = (data: VerificationData): VerificationDataType => {
    return {
        verification_code: data.verificationCode,
    };
};
