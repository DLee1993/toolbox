export const GeneratePassword = (length: number = 12) => {
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const digits = "0123456789";
    const special = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

    const allChars = upper + lower + digits + special;

    // Ensure at least one of each type
    const required = [
        randomChar(upper),
        randomChar(lower),
        randomChar(digits),
        randomChar(special),
    ];

    const remainingLength = length - required.length;
    const randomChars = Array.from({ length: remainingLength }, () => randomChar(allChars));

    const passwordArray = [...required, ...randomChars];
    shuffleArray(passwordArray);

    return passwordArray.join("");
};

// Generate a pin code
export const GeneratePin = (length: number = 6) => {

    const digits = "0123456789";
    let pin = "";

    for (let i = 0; i < length; i++) {
        const array = new Uint32Array(1);
        crypto.getRandomValues(array);
        pin += digits[array[0] % digits.length];
    }

    return pin;
};

function randomChar(charset: string): string {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return charset[array[0] % charset.length];
}

function shuffleArray(array: string[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor((crypto.getRandomValues(new Uint32Array(1))[0] / 2 ** 32) * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
