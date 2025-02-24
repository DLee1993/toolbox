"use client";

import { useRef, useState } from "react";
import { GeneratePassword, GenerateCode } from "@/hooks/credentials-generator/generate-credentials";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CopyIcon, RefreshCcwIcon } from "lucide-react";
import { Copy } from "@/hooks/global/copy-to-clipboard";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function CredentialsGenerator() {
    const passwordInput = useRef<HTMLInputElement>(null);
    const pinInput = useRef<HTMLInputElement>(null);
    const [pinLength, setPinLength] = useState<string>("5");
    const pinLengthOptions = ["5", "6", "7", "8", "9", "10", "11", "12"];

    return (
        <section>
            <section className="space-y-10">
                <article className="space-y-2 text-center">
                    <h1 className="text-xl tracking-tight text-pretty">Manage your privacy.</h1>
                    <p className="max-w-md mx-auto">
                        Safeguard your online presence with unbreakable passwords and protect your
                        valuable data.
                    </p>
                </article>
                <section id="grid-container" className="grid lg:grid-cols-2 gap-6">
                    <section className="space-y-10 p-4 rounded-2xl bg-muted/50">
                        <aside className="flex flex-col sm:flex-row justify-between items-start gap-5">
                            <div className="space-y-2">
                                <h2 className="text-md">Pin code generator</h2>
                                <p className="text-sm max-w-xs">
                                    Generate a random pin code, use the selector to change the
                                    length of the pin if needed.
                                </p>
                            </div>
                            <Select onValueChange={setPinLength}>
                                <SelectTrigger
                                    className="w-40 h-10 border shadow-none"
                                    aria-label="select pin code length"
                                >
                                    <SelectValue placeholder="Code length" />
                                </SelectTrigger>
                                <SelectContent className="max-h-48">
                                    {pinLengthOptions.map((option, index) => (
                                        <SelectItem key={index} value={option}>
                                            {option}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </aside>
                        <Input
                            readOnly
                            ref={pinInput}
                            placeholder="140312"
                            className="!text-lg text-foreground font-medium tracking-[0.2rem] border-none shadow-none"
                        ></Input>
                        <div className="flex flex-wrap space-x-4">
                            <Button
                                variant="secondary"
                                onClick={() => GenerateCode({ input: pinInput, length: pinLength })}
                                aria-label="click to generate pin code"
                            >
                                Generate pin <RefreshCcwIcon />
                            </Button>
                            <Button
                                variant="ghost"
                                onClick={() => Copy({ input: pinInput.current?.value || "" })}
                                aria-label="click to copy pin"
                            >
                                Copy to clipboard <CopyIcon size={16} />
                            </Button>
                        </div>
                    </section>
                    <section className="space-y-10 p-4 rounded-2xl bg-muted/50">
                        <aside className="flex flex-col sm:flex-row justify-between items-start gap-5">
                            <div className="space-y-2">
                                <h2 className="text-md">Password generator</h2>
                                <p className="text-sm max-w-xs">
                                    Generate a strong and unique password to protect your accounts
                                    and sensitive information.
                                </p>
                            </div>
                        </aside>
                        <Input
                            readOnly
                            ref={passwordInput}
                            placeholder="]-[vPW}~'1=>"
                            className="!text-lg text-foreground font-medium tracking-[0.2rem] border-none shadow-none"
                        ></Input>
                        <div className="flex flex-wrap space-x-4">
                            <Button
                                variant="secondary"
                                onClick={() =>
                                    GeneratePassword({
                                        input: passwordInput,
                                    })
                                }
                                aria-label="click to generate password"
                            >
                                Generate password <RefreshCcwIcon />
                            </Button>
                            <Button
                                variant="ghost"
                                onClick={() => Copy({ input: passwordInput.current?.value || "" })}
                                aria-label="click to copy password"
                            >
                                Copy to clipboard <CopyIcon size={16} />
                            </Button>
                        </div>
                    </section>
                </section>
            </section>
        </section>
    );
}
