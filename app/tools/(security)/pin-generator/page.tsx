"use client";

import { useRef, useState } from "react";
import { GenerateCode } from "@/hooks/credentials-generator/generate-credentials";
import { Copy } from "@/hooks/global/copy-to-clipboard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CopyIcon, RefreshCcwIcon } from "lucide-react";
import { Slider } from "@/components/ui/slider";

export default function CredentialsGenerator() {
    const codeInput = useRef<HTMLInputElement>(null);
    const [length, setLength] = useState<number>(4);

    return (
        <section className="flex flex-col justify-center items-center py-10 space-y-10">
            <article className="space-y-3 mx-auto text-center">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold">
                    Code Generator.
                </h1>
                <h2 className="max-w-lg font-light">
                    Our code generator is a reliable tool designed to create random codes.
                </h2>
                {/* <p className="font-semibold">All you have to do, is choose the length.</p> */}
            </article>
            <div className="flex gap-2">
                <p>Length:</p>
                <Slider
                    defaultValue={[length]}
                    max={10}
                    min={1}
                    step={1}
                    onValueChange={(value) => setLength(value[0])}
                    className="w-40"
                />
                <div>{length}</div>
            </div>
            <Input
                readOnly
                ref={codeInput}
                name="code input"
                placeholder="49302"
                className="w-full max-w-96 min-h-12 text-center text-foreground font-semibold border border-muted"
            ></Input>
            <div className="flex flex-col sm:flex-row gap-2 justify-center items-center mx-auto max-w-80">
                <Button
                    onClick={() =>
                        GenerateCode({
                            input: codeInput,
                            length,
                        })
                    }
                    aria-label="click to generate code code"
                    className="clickAnim w-full min-w-52"
                >
                    Generate code <RefreshCcwIcon />
                </Button>
                <Button
                    className="clickAnim w-full min-w-52"
                    variant="outline"
                    onClick={() => Copy({ input: codeInput.current?.value || "" })}
                    aria-label="click to copy code"
                >
                    Copy to clipboard <CopyIcon size={16} />
                </Button>
            </div>
        </section>
    );
}
