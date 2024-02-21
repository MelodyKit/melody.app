import { Repeat, type RepeatLiteral } from "@/api/enums";

export const BASE_URL = "https://melodykit.app";
export const API_PATH = "/api/v1";
export const API_URL = `${BASE_URL}${API_PATH}`;

export const ARRAY_BUFFER = "arraybuffer";
export const BINARY = "binary";

export const DEFAULT_PLAYING = false;
export const DEFAULT_SHUFFLE = false;
export const DEFAULT_REPEAT = Repeat.Default;
export const DEFAULT_REPEAT_LITERAL = DEFAULT_REPEAT as RepeatLiteral;
export const DEFAULT_VOLUME = 0.5;
