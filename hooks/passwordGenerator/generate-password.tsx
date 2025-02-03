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
            input.current!.style.border = "1px solid rgb(148 163 184)";
        });
    });
};
