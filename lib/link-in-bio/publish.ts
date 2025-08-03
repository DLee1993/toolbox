import { Copy } from "@/lib/global/copy-to-clipboard";
import { encodeData } from "@/lib/link-in-bio/encoder";

export const publish = (formValues: LinkInBioValues) => {
    const url = `${window.location.origin}/tools/link-in-bio-preview?data=${encodeData(
        JSON.stringify(formValues)
    )}`;

    try {
        const result = Copy({ input: url });
        if (!result) {
            throw new Error("Unable to copy to clipboard");
        }
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};
