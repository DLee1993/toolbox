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
    const [passwordLength, setPasswordLength] = useState<string>("12");
    const passwordLengthOptions = new Array(13).fill(0).map((_, idx) => idx + 12);
    const pinInput = useRef<HTMLInputElement>(null);
    const [pinLength, setPinLength] = useState<string>("5");
    const pinLengthOptions = ["5", "6", "7", "8", "9", "10", "11", "12"];

    return (
        <section className="minHeight customYPadding">
            <section
                id="grid-container"
                className="w-11/12 max-w-6xl mx-auto grid lg:grid-cols-2 lg:grid-rows-2 gap-6"
            >
                <div className="p-4 rounded-2xl">
                    <article className="space-y-4 text-sm">
                        <h1 className="text-3xl">Manage your privacy.</h1>
                        <p>
                            Safeguard your online presence with unbreakable passwords and protect
                            your valuable data.
                        </p>
                        <p>
                            Here you can generate both{" "}
                            <span className="text-primary">passwords</span> and{" "}
                            <span className="text-primary">pin codes</span>
                        </p>
                        <p className="text-sm">
                            <span className="font-bold">**</span> Don&apos;t rely on PIN codes for
                            primary protection of your valuable data; use strong, unique passwords
                            instead. <span className="font-bold">**</span>
                        </p>
                    </article>
                </div>
                <div className="p-4 rounded-2xl bg-accent">
                    <section className="space-y-10">
                        <aside className="flex flex-col sm:flex-row justify-between items-start gap-5">
                            <div className="space-y-2">
                                <h2 className="text-xl">Pin code generator</h2>
                                <p className="text-sm max-w-xs">
                                    Generate a random pin code, use the selector to change the
                                    length of the pin if needed.
                                </p>
                            </div>
                            <Select onValueChange={setPinLength}>
                                <SelectTrigger className="w-40 h-10 border border-foreground shadow-none">
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
                            className="h-full !text-xl text-foreground placeholder:text-muted-foreground font-medium tracking-[0.2rem] border-none shadow-none"
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
                                variant="secondary"
                                onClick={() => Copy({ input: pinInput.current?.value || "" })}
                                aria-label="click to copy pin"
                            >
                                Copy to clipboard <CopyIcon size={16} />
                            </Button>
                        </div>
                    </section>
                </div>
                <div className="p-4 rounded-2xl bg-primary text-background lg:col-span-2">
                    <section className="space-y-10">
                        <aside className="flex flex-col sm:flex-row justify-between items-start gap-5">
                            <div className="space-y-2">
                                <h2 className="text-xl">Password generator</h2>
                                <p className="text-sm max-w-xs">
                                    Generate a secure password, use the selector to change the
                                    length of password if needed.
                                </p>
                            </div>
                            <Select onValueChange={setPasswordLength}>
                                <SelectTrigger className="w-40 h-10 border shadow-none">
                                    <SelectValue placeholder="Password length" />
                                </SelectTrigger>
                                <SelectContent className="max-h-48">
                                    {passwordLengthOptions.map((option, index) => (
                                        <SelectItem key={index} value={option.toString()}>
                                            {option}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </aside>
                        <Input
                            readOnly
                            ref={passwordInput}
                            placeholder="]-[vPW}~'1=>"
                            className="h-full !text-xl text-foreground placeholder:text-muted-foreground font-medium tracking-[0.2rem] border-none shadow-none"
                        ></Input>
                        <div className="flex flex-wrap space-x-4">
                            <Button
                                variant="secondary"
                                onClick={() =>
                                    GeneratePassword({
                                        input: passwordInput,
                                        length: passwordLength,
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
                </div>
            </section>
        </section>
    );
}
