export const WriteToClipboard = async ({
    input,
}: {
    input: React.RefObject<HTMLInputElement | null>;
}) => {
    try {
        await navigator.clipboard.writeText(input.current!.value);
        return true;
    } catch (error) {
        console.log(error);
        new Error("Unable to copy to clipboard, please try again");
        return false;
    }
};
