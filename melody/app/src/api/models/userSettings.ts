import { Platform, type PlatformLiteral, PrivacyType, type PrivacyTypeLiteral } from "@/api/enums";

export interface UserSettingsModel {
    name: string;
    explicit: boolean;
    autoplay: boolean;
    platform: string;
    privacy_type: string;
}

export interface UserSettingsType {
    name: string;
    explicit: boolean;
    autoplay: boolean;
    platform: PlatformLiteral;
    privacyType: PrivacyTypeLiteral;
}

export function userSettingsTypeFromModel(model: UserSettingsModel): UserSettingsType {
    return {
        name: model.name,
        explicit: model.explicit,
        autoplay: model.autoplay,
        platform: model.platform as PlatformLiteral,  // TODO: validate?
        privacyType: model.privacy_type as PrivacyTypeLiteral,  // TODO: validate?
    };
}

export class UserSettings {
    name: string;
    explicit: boolean;
    autoplay: boolean;
    platform: Platform;
    privacyType: PrivacyType;

    static fromModel(model: UserSettingsModel) {
        return new this(userSettingsTypeFromModel(model));
    }

    constructor(userSettings: UserSettingsType) {
        this.name = userSettings.name;
        this.explicit = userSettings.explicit;
        this.autoplay = userSettings.autoplay;
        this.platform = userSettings.platform as Platform;
        this.privacyType = userSettings.privacyType as PrivacyType;
    }
}
