"use client";

import { useRef, useState } from "react";
import { GenerateCode } from "@/hooks/credentials-generator/generate-credentials";
import { Copy } from "@/hooks/global/copy-to-clipboard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CopyIcon, RefreshCcwIcon } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function CredentialsGenerator() {
    const pinInput = useRef<HTMLInputElement>(null);
    const [pinLength, setPinLength] = useState<string>("5");
    const pinLengthOptions = ["5", "6", "7", "8", "9", "10", "11", "12"];

    return (
        <section>
            <section className="space-y-10 py-10">
                <article className="text-center">
                    <h1 className="text-lg md:text-xl">Your trusted Credentials Generator.</h1>
                    <p className="max-w-3xl mx-auto my-5">
                        In the realm of cybersecurity, ensuring robust and secure credentials is
                        paramount. Whether you require passwords, or pin codes, We provide a
                        reliable solution to fortify your online presence.
                    </p>
                    <p className="text-sm font-bold">
                        We recommed only using pin codes for non valuable data/applications, as pin
                        codes are easily cracked.
                    </p>
                </article>
                <section className="flex justify-between items-center gap-5 flex-col lg:flex-row">
                    <section className="min-h-60 w-full px-2 flex flex-col justify-between items-start">
                        <div className="flex justify-between items-center w-full">
                            <h2 className="text-base">Create a pin</h2>
                            <Select onValueChange={setPinLength} name="pin length">
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
                            name="pin input"
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
