// generate a password
export const GeneratePassword = ({
    input,
    length = 8,
}: {
    input: React.RefObject<HTMLInputElement | null>;
    length?: number;
}) => {
    if (!input.current) {
        console.log("not found");
        return;
    }

    const password = Array.from({ length }, () => String.fromCharCode(getCharCode())).join("");

    input.current.value = password;

    return password;
};

// Generate a pin code
export const GenerateCode = ({
    input,
    length = 4,
}: {
    input: React.RefObject<HTMLInputElement | null>;
    length?: number;
}) => {
    if (!input.current) return;

    const pin = Array.from({ length: Number(length) }, () => Math.floor(Math.random() * 10)).join(
        ""
    );

    input.current.value = pin;
};

// Pre-flatten the ranges into a single array
const preFlattenedCharCodes = [
    ...Array.from({ length: 10 }, (_, i) => 48 + i), // Numbers 0-9
    ...Array.from({ length: 26 }, (_, i) => 65 + i), // Uppercase A-Z
    ...Array.from({ length: 26 }, (_, i) => 97 + i), // Lowercase a-z
    ...Array.from({ length: 15 }, (_, i) => 33 + i), // Special characters !"#$%&'()*+,-./
    ...Array.from({ length: 7 }, (_, i) => 58 + i), // Special characters :;<=>?@
    ...Array.from({ length: 6 }, (_, i) => 91 + i), // Special characters [\]^_`
    ...Array.from({ length: 4 }, (_, i) => 123 + i), // Special characters {|}~
];

// Generate a character
function getCharCode() {
    return preFlattenedCharCodes[Math.floor(Math.random() * preFlattenedCharCodes.length)];
}
