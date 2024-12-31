"use client";

import { useRef } from "react";
import bcrypt from "bcryptjs";
import { generate } from "generate-password";
import { Button } from "@/components/ui/button";

export default function PasswordGenerator() {
    const input = useRef<HTMLParagraphElement>(null);

    const genPass = () => {
        const password = generate({
            length: 10,
            numbers: true,
            symbols: true,
            strict: true,
        });

        bcrypt.genSalt(10, function (err: Error | null, salt: string) {
            if (err) return;
            bcrypt.hash(password, salt, function (err: Error | null, hash: string) {
                if (err) {
                    input.current!.innerText = err.message;
                    return;
                }
                input.current!.innerText = hash;
                input.current!.style.border = "1px solid rgb(148 163 184)";
            });
        });
    };

    const writeToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(input.current!.innerText);
            console.log("password copied");
        } catch (error) {
            console.log(error);
            new Error("Unable to copy to clipboard, please try again");
            // } finally {
            //     toast("password copied", {
            //         position: "bottom-center",
            //         autoClose: 1000,
            //         hideProgressBar: true,
            //         newestOnTop: true,
            //         closeOnClick: true,
            //         rtl: false,
            //         pauseOnFocusLoss: true,
            //         draggable: false,
            //         pauseOnHover: false,
            //     });
            // }
        }
    };

    return <section className="minHeight flex flex-col justify-evenly items-center"></section>;
}
