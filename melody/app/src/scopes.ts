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

export const fromScope = (scope: string) => (scope ? scope.split(SCOPE_SEPARATOR) : []);
export const intoScope = (scopes: string[]) => scopes.join(SCOPE_SEPARATOR);

export const DESCRIBED_SCOPES = {
    [USER_FOLLOWING_READ]: "Read access to your followers and users you follow.",
    [USER_FOLLOWING_WRITE]: "Write access to your followers and users you follow.",
    [USER_LIBRARY_READ]: "Read access to your library.",
    [USER_LIBRARY_WRITE]: "Write access to your library.",
    [USER_PLAYLISTS_READ]: "Read access to your playlists.",
    [USER_PLAYLISTS_WRITE]: "Write access to your playlists.",
    [USER_SETTINGS_READ]: "Read access to your settings.",
    [USER_SETTINGS_WRITE]: "Write access to your settings.",
    [USER_IMAGE_READ]: "Read access to your image.",
    [USER_IMAGE_WRITE]: "Write access to your image.",
    [USER_STREAMS_READ]: "Read access to your streams.",
    [USER_STREAMS_WRITE]: "Write access to your streams.",
};

export type DescribedScope = keyof typeof DESCRIBED_SCOPES;

export const isDescribedScope = (scope: string): scope is DescribedScope =>
    scope in DESCRIBED_SCOPES;
export const describeScope = (scope: DescribedScope) => DESCRIBED_SCOPES[scope];
