import { type VerificationData } from "@/api/data/verification";

import { type Nullable } from "@/nullable";

export interface VerificationForm {
    verificationCode: Nullable<string>;
}

export function verificationFormIntoData(form: VerificationForm): VerificationData {
    const verificationCode = form.verificationCode;

    if (verificationCode == null) {
        throw new Error("verification code is not present");
    }

    return {verificationCode};
}
