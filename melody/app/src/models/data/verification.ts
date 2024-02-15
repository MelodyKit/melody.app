import { type Optional } from "@/typing";

export interface VerificationForm {
    verificationCode: Optional<string>;
}

export interface VerificationData {
    verification_code: string;
}

export function verificationDataFromForm(form: VerificationForm): VerificationData {
    const verification_code = form.verificationCode;

    if (verification_code == null) {
        throw new Error("expected verification code");
    }

    return {verification_code};
}
