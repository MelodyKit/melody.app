import { Buffer } from "buffer";

import { BASE64 } from "@/constants";

import { type Nullable } from "@/nullable";
import { ICON_URL } from "./api/constants";

const IMAGE_HEADER = "data";
const IMAGE_TYPE = "image/png";

export const constructImage = (buffer: Buffer) => {
    const image = buffer.toString(BASE64);

    return `${IMAGE_HEADER}:${IMAGE_TYPE};${BASE64},${image}`;
};

export const constructUserImage = (buffer: Nullable<Buffer>) => {
    return buffer ? constructImage(buffer) : ICON_URL;
};
