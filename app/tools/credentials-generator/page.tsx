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
import { Separator } from "@/components/ui/separator";

export default function CredentialsGenerator() {
    const passwordInput = useRef<HTMLInputElement>(null);
    const pinInput = useRef<HTMLInputElement>(null);
    const [pinLength, setPinLength] = useState<string>("5");
    const pinLengthOptions = ["5", "6", "7", "8", "9", "10", "11", "12"];

    return (
        <section>
            <section className="space-y-10">
                <article className="space-y-2 text-center">
                    <h1 className="text-xl leading-none font-light">Manage your privacy.</h1>
                    <p className="max-w-md mx-auto">
                        Safeguard your online presence with unbreakable passwords and protect your
                        valuable data.
                    </p>
                </article>
                <section className="flex justify-between items-center gap-5 flex-col lg:flex-row">
                    <section className="min-h-72 w-full px-2 pt-10 flex flex-col justify-between items-start">
                        <article>
                            <h2 className="text-base">Create a Password</h2>
                            <p className="text-sm max-w-xs">
                                Generate a strong and unique password to protect your accounts and
                                sensitive information.
                            </p>
                        </article>
                        <Input
                            readOnly
                            ref={passwordInput}
                            placeholder="]-[vPW}~'1=>"
                            className="!text-base text-foreground min-h-14 border-muted"
                        ></Input>
                        <div className="flex flex-wrap space-x-4">
                            <Button
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
                                variant="secondary"
                                onClick={() => Copy({ input: passwordInput.current?.value || "" })}
                                aria-label="click to copy password"
                            >
                                Copy to clipboard <CopyIcon size={16} />
                            </Button>
                        </div>
                    </section>
                    <Separator orientation="vertical" className="lg:h-72 bg-muted" />
                    <section className="min-h-72 w-full px-2 pt-10 flex flex-col justify-between items-start">
                        <div className="flex justify-between items-center w-full">
                            <article>
                                <h2 className="text-base">Create a pin</h2>
                                <p className="text-sm max-w-xs">
                                    Generate a random pin code, use the selector to change the
                                    length of the pin if needed.
                                </p>
                            </article>
                            <Select onValueChange={setPinLength}>
                                <SelectTrigger
                                    className="w-32 h-10 border shadow-none"
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
                        </div>
                        <Input
                            readOnly
                            ref={pinInput}
                            placeholder="140312"
                            className="!text-base text-foreground min-h-14 border-muted"
                        ></Input>
                        <div className="flex flex-wrap space-x-4">
                            <Button
                                onClick={() => GenerateCode({ input: pinInput, length: pinLength })}
                                aria-label="click to generate pin code"
                            >
                                Generate pin <RefreshCcwIcon />
                            </Button>
                            <Button
                                variant="secondary"
                                onClick={() => Copy({ input: pinInput.current?.value || "" })}
                                aria-label="click to copy pin"
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
