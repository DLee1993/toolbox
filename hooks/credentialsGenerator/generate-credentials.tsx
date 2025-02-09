import bcrypt from "bcryptjs";
import { generate } from "generate-password";

export const GenPass = ({ input }: { input: React.RefObject<HTMLInputElement | null> }) => {
    const password = generate({
        length: 4,
        numbers: true,
        symbols: true,
        strict: true,
    });

    bcrypt.genSalt(function (err: Error | null, salt: string) {
        if (err) return;
        bcrypt.hash(password, salt, function (err: Error | null, hash: string) {
            if (err) {
                input.current!.innerText = err.message;
                return;
            }
            input.current!.value = hash.slice(7, -1);
        });
    });
};

export const CodePass = ({
    input,
    length,
}: {
    input: React.RefObject<HTMLInputElement | null>;
    length: string;
}) => {
    let pin = "";

    while (pin.length < parseInt(length)) {
        const randomNumber = Math.floor(Math.random() * 10);
        pin += randomNumber;
    }

    input.current!.value = pin.toString();
};
