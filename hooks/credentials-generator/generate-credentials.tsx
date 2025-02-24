export const GeneratePassword = ({
    input,
}: {
    input: React.RefObject<HTMLInputElement | null>;
}) => {
    let password = "";
    const length = 24;

    for (let i = 0; i < Number(length); i++) {
        const charCode = getCharCode();
        password += String.fromCharCode(charCode);
    }
    input.current!.value = password;
};

export const GenerateCode = ({
    input,
    length,
}: {
    input: React.RefObject<HTMLInputElement | null>;
    length: string;
}) => {
    let pin = "";

    while (pin.length < Number(length)) {
        const randomNumber = Math.floor(Math.random() * 10);
        pin += randomNumber;
    }

    input.current!.value = pin.toString();
};

function getCharCode() {
    const ranges = [
        { min: 48, max: 57 }, // Numbers 0-9
        { min: 65, max: 90 }, // Uppercase A-Z
        { min: 97, max: 122 }, // Lowercase a-z
        { min: 33, max: 47 }, // Special characters !"#$%&'()*+,-./
        { min: 58, max: 64 }, // Special characters :;<=>?@
        { min: 91, max: 96 }, // Special characters [\]^_`
        { min: 123, max: 126 }, // Special characters {|}~
    ];
    const range = ranges[Math.floor(Math.random() * ranges.length)];
    return Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
}
