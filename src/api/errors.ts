import type { Nullable } from "./nullable.ts";

export enum ErrorCode {
    // unknown
    Unknown = "unknown",
    // albums
    AlbumNotFound = "album_not_found",
    // artists
    ArtistNotFound = "artist_not_found",
    // tracks
    TrackNotFound = "track_not_found",
    // playlists
    PlaylistNotFound = "playlist_not_found",
    PlaylistInaccessible = "playlist_inaccessible",
    PlaylistImageNotFound = "playlist_image_not_found",
    // users
    UserNotFound = "user_not_found",
    UserImageNotFound = "user_image_not_found",
    UserBlockSelfForbidden = "user_block_self_forbidden",
    UserFollowSelfForbidden = "user_follow_self_forbidden",
    UserFollowSelfPlaylistsForbidden = "user_follow_self_playlists_forbidden",
    // clients
    ClientNotFound = "client_not_found",
    // streams
    StreamNotFound = "stream_not_found",
    // auth: access tokens
    AuthAccessTokenNotFound = "auth_access_token_not_found",
    AuthAccessTokenInvalid = "auth_access_token_invalid",
    AuthAccessTokenExpectedType = "auth_access_token_expected_type",
    AuthAccessTokenExpectedUser = "auth_access_token_expected_user",
    AuthAccessTokenExpectedUserBased = "auth_access_token_expected_user_based",
    AuthAccessTokenScopesMissing = "auth_access_token_scopes_missing",
    // auth: refresh tokens
    AuthRefreshTokenExpected = "auth_refresh_token_expected",
    AuthRefreshTokenInvalid = "auth_refresh_token_invalid",
    // auth: client credentials
    AuthClientCredentialsExpected = "auth_client_credentials_expected",
    AuthClientCredentialsInvalid = "auth_client_credentials_invalid",
    AuthClientCredentialsMismatch = "auth_client_credentials_mismatch",
    AuthClientCredentialsNotFound = "auth_client_credentials_not_found",
    AuthClientCredentialsSecretMismatch = "auth_client_credentials_secret_mismatch",
    // auth: authorization codes
    AuthAuthorizationCodeExpected = "auth_authorization_code_expected",
    AuthAuthorizationCodeInvalid = "auth_authorization_code_invalid",
    AuthAuthorizationCodeRedirectUriExpected = "auth_authorization_code_redirect_uri_expected",
    AuthAuthorizationCodeRedirectUriMismatch = "auth_authorization_code_redirect_uri_mismatch",
    // auth: verification codes
    AuthVerificationCodeInvalid = "auth_verification_code_invalid",
    // auth: emails
    AuthEmailInvalid = "auth_email_invalid",
    AuthEmailConflict = "auth_email_conflict",
    AuthEmailFailed = "auth_email_failed",
    AuthEmailNotFound = "auth_email_not_found",
    AuthEmailUnverified = "auth_email_unverified",
    // auth: passwords
    AuthPasswordInvalid = "auth_password_invalid",
    AuthPasswordMismatch = "auth_password_mismatch",
    // auth: codes
    AuthCodeExpected = "auth_code_expected",
    AuthCodeMismatch = "auth_code_mismatch",
    AuthCodeConflict = "auth_code_conflict",
    AuthCodeNotFound = "auth_code_not_found",
    // images
    ImageUnexpectedType = "image_unexpected_type",
    ImageExpectedSquare = "image_expected_square",
    ImageDataTooLarge = "image_data_too_large",
    ImageSizeTooLarge = "image_size_too_large",
}

export type ErrorCodeValue = `${ErrorCode}`;

export const ERROR_CODES = new Set(Object.values(ErrorCode));

export const ERROR_CODE_VALUES = ERROR_CODES as Set<string>;

export const isErrorCodeValue = (value: string): value is ErrorCodeValue =>
    ERROR_CODE_VALUES.has(value);

export const tryParseErrorCode = (value: string): Nullable<ErrorCode> =>
    isErrorCodeValue(value) ? value as ErrorCode : null;

export const parseErrorCode = (value: string): ErrorCode =>
    tryParseErrorCode(value) ?? ErrorCode.Unknown;
