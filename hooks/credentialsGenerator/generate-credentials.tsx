import bcrypt from "bcryptjs";
import { generate } from "generate-password";

export const GenPass = ({ input }: { input: React.RefObject<HTMLInputElement | null> }) => {
    const password = generate({
        length: 10,
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
            input.current!.value = hash;
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
    console.log(length);

    let pin = "";

    for (let i = 0; i < Number(length); i++) {
        pin += Math.floor(Math.random() * 10);
    }

    input.current!.value = pin.toString();
};
