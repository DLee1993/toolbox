"use client";

import { useRef, useState } from "react";
import { GeneratePassword } from "@/hooks/credentials-generator/generate-credentials";
import { Copy } from "@/hooks/global/copy-to-clipboard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CopyIcon, RefreshCcwIcon } from "lucide-react";
import { Slider } from "@/components/ui/slider";

export default function CredentialsGenerator() {
    const passwordInput = useRef<HTMLInputElement>(null);
    const [length, setLength] = useState<number>(8);

    return (
        <section className="flex flex-col justify-center items-center py-10 space-y-10">
            <article className="space-y-3 mx-auto text-center">
                <h1 className="text-3xl font-semibold">Your trusted Password Generator.</h1>
                <h2 className="max-w-lg">
                    Our password generator is a reliable tool designed to create secure, random, and
                    complex passwords.
                </h2>
                {/* <p className="font-semibold">All you have to do, is choose the length.</p> */}
            </article>
            <div className="flex gap-2">
                <p>Length:</p>
                <Slider
                    defaultValue={[length]}
                    max={30}
                    min={1}
                    step={1}
                    onValueChange={(value) => setLength(value[0])}
                    className="w-40"
                />
                <div>{length}</div>
            </div>
            <Input
                readOnly
                ref={passwordInput}
                name="password input"
                placeholder="]-[vPW}~'1=>"
                className="w-full max-w-96 text-center text-foreground font-semibold border border-foreground"
            ></Input>
            <div className="flex flex-wrap gap-2 justify-center items-center mx-auto w-full max-w-96">
                <Button
                    onClick={() =>
                        GeneratePassword({
                            input: passwordInput,
                            length,
                        })
                    }
                    aria-label="click to generate password"
                    className="clickAnim flex-1"
                >
                    Generate password <RefreshCcwIcon />
                </Button>
                <Button
                    className="clickAnim flex-1"
                    variant="outline"
                    onClick={() => Copy({ input: passwordInput.current?.value || "" })}
                    aria-label="click to copy password"
                >
                    Copy to clipboard <CopyIcon size={16} />
                </Button>
            </div>
        </section>
    );
}
