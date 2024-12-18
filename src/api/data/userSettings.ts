import type { Platform, PlatformValue, PrivacyType, PrivacyTypeValue } from "@/api/enums";

export interface UserSettingsDataType {
    name: string;
    explicit: boolean;
    autoplay: boolean;
    platform: PlatformValue;
    privacy_type: PrivacyTypeValue;
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
        platform: data.platform as PlatformValue,
        privacy_type: data.privacyType as PrivacyTypeValue,
    };
};
