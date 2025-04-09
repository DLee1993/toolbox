import { NotifyUser } from "./NotifyUser";

const writeToClipboard = async (input: string) => {
    try {
        await navigator.clipboard.writeText(input);
        return true;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const Copy = async ({ input }: { input: string }) => {
    if (input.length === 0) {
        return NotifyUser({ type: "Error", message: "Nothing to copy" });
    } else {
        const success = await writeToClipboard(input);

        if (success) {
            NotifyUser({ type: "Success", message: "Copied to clipboard" });
        } else {
            NotifyUser({ type: "Error", message: "Failed to copy to clipboard" });
        }
    }
};
