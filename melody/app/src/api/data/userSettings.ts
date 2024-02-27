import type { Platform, PlatformLiteral, PrivacyType, PrivacyTypeLiteral } from "@/api/enums";

export interface UserSettingsDataType {
    name: string;
    explicit: boolean;
    autoplay: boolean;
    platform: PlatformLiteral;
    privacy_type: PrivacyTypeLiteral;
}

export interface UserSettingsData {
    name: string;
    explicit: boolean;
    autoplay: boolean;
    platform: Platform;
    privacyType: PrivacyType;
}

export const userSettingsDataIntoType = (data: UserSettingsData): UserSettingsDataType => {
    return {
        name: data.name,
        explicit: data.explicit,
        autoplay: data.autoplay,
        platform: data.platform as PlatformLiteral,
        privacy_type: data.privacyType as PrivacyTypeLiteral,
    };
};
