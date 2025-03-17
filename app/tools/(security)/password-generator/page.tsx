"use client";

import { useRef } from "react";
import { GeneratePassword } from "@/hooks/credentials-generator/generate-credentials";
import { Copy } from "@/hooks/global/copy-to-clipboard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CopyIcon, RefreshCcwIcon } from "lucide-react";

export default function CredentialsGenerator() {
    const passwordInput = useRef<HTMLInputElement>(null);

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
                        <h2 className="text-base">Create a Password</h2>
                        <Input
                            readOnly
                            ref={passwordInput}
                            name="password input"
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
                </section>
            </section>
        </section>
    );
}
