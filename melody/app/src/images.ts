import { BASE64 } from "@/constants";

const IMAGE_HEADER = "data";
const IMAGE_TYPE = "image/png";

export function constructImage(image: string) {
    return `${IMAGE_HEADER}:${IMAGE_TYPE};${BASE64},${image}`;
}
