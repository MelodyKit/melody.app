import type { Nullable } from "./nullable.ts";
import { ticked } from "./ticked.ts";

export const parseError = (name: string, value: string): never => {
  throw new Error(`can not parse ${ticked(value)} into ${ticked(name)}`);
};

export enum AlbumType {
  Album = "album",
  Single = "single",
  Compilation = "compilation",
  Default = Album,
}

export type AlbumTypeValue = `${AlbumType}`;

export const ALBUM_TYPES = new Set(Object.values(AlbumType));

export const ALBUM_TYPE_VALUES = ALBUM_TYPES as Set<string>;

export const isAlbumTypeValue = (value: string): value is AlbumTypeValue =>
  ALBUM_TYPE_VALUES.has(value);

export const tryParseAlbumType = (value: string): Nullable<AlbumType> =>
  isAlbumTypeValue(value) ? value as AlbumType : null;

export const parseAlbumType = (value: string): AlbumType =>
  tryParseAlbumType(value) ?? parseError("AlbumType", value);

export enum GrantType {
  AuthorizationCode = "authorization_code",
  ClientCredentials = "client_credentials",
  RefreshToken = "refresh_token",
}

export type GrantTypeValue = `${GrantType}`;

export const GRANT_TYPES = new Set(Object.values(GrantType));

export const GRANT_TYPE_VALUES = GRANT_TYPES as Set<string>;

export const isGrantTypeValue = (value: string): value is GrantTypeValue =>
  GRANT_TYPE_VALUES.has(value);

export const tryParseGrantType = (value: string): Nullable<GrantType> =>
  isGrantTypeValue(value) ? value as GrantType : null;

export const parseGrantType = (value: string): GrantType =>
  tryParseGrantType(value) ?? parseError("GrantType", value);
