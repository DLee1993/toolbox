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
        return NotifyUser("Error", "Nothing to copy");
    } else {
        const success = await writeToClipboard(input);

        if (success) {
            NotifyUser("Success", "Copied to clipboard");
        } else {
            NotifyUser("Error", "Failed to copy to clipboard");
        }
    }
};
