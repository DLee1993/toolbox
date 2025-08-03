import { encode, decode } from "js-base64";

export const encodeData = (string: string) => {
    return encode(string);
};

export const decodeData = (string: string) => {
    return JSON.parse(decode(string));
};
