import { GrantType } from "@/enums";

export interface RefreshData {
    grant_type: GrantType.RefreshToken;
    refresh_token: string;
}
