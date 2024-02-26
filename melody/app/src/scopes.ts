export const USER_FOLLOWING_READ = "user-following-read";
export const USER_FOLLOWING_WRITE = "user-following-write";
export const USER_LIBRARY_READ = "user-library-read";
export const USER_LIBRARY_WRITE = "user-library-write";
export const USER_PLAYLISTS_READ = "user-playlists-read";
export const USER_PLAYLISTS_WRITE = "user-playlists-write";
export const USER_SETTINGS_READ = "user-settings-read";
export const USER_SETTINGS_WRITE = "user-settings-write";
export const USER_IMAGE_READ = "user-image-read";
export const USER_IMAGE_WRITE = "user-image-write";
export const USER_STREAMS_READ = "user-streams-read";
export const USER_STREAMS_WRITE = "user-streams-write";

export const SCOPE_SEPARATOR = " ";

export const DESCRIBED_SCOPES = {
    [USER_FOLLOWING_READ]: "Read access to the user's following.",
    [USER_FOLLOWING_WRITE]: "Write access to the user's following.",
    [USER_LIBRARY_READ]: "Read access to the user's library.",
    [USER_LIBRARY_WRITE]: "Write access to the user's library.",
    [USER_PLAYLISTS_READ]: "Read access to the user's playlists.",
    [USER_PLAYLISTS_WRITE]: "Write access to the user's playlists.",
    [USER_SETTINGS_READ]: "Read access to the user's settings.",
    [USER_SETTINGS_WRITE]: "Write access to the user's settings.",
    [USER_IMAGE_READ]: "Read access to the user's image.",
    [USER_IMAGE_WRITE]: "Write access to the user's image.",
    [USER_STREAMS_READ]: "Read access to the user's streams.",
    [USER_STREAMS_WRITE]: "Write access to the user's streams.",
}
