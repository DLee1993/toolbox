import { encode, decode } from "js-base64";

export const encodeData = (userData: LinkInBioValues) => {
    return encode(JSON.stringify(userData));
};

export const decodeData = (base64: string) => JSON.parse(decode(base64));
