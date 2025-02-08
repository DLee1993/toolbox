export const WriteToClipboard = async ({ input }: { input: string }) => {
    try {
        await navigator.clipboard.writeText(input);
        return true;
    } catch (error) {
        console.log(error);
        new Error("Unable to copy to clipboard, please try again");
        return false;
    }
};
