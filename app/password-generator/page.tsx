"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { CopyIcon, RefreshCcwIcon } from "lucide-react";
import { TooltipProvider, TooltipContent, Tooltip, TooltipTrigger } from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { GenPass } from "@/hooks/generate-password";
import { WriteToClipboard } from "@/hooks/copy-to-clipboard";

export default function PasswordGenerator() {
    const input = useRef<HTMLInputElement>(null);

    useEffect(() => GenPass({ input }), []);

    return (
        <section className="px-2 sm:px-5 md:px-7 lg:px-10 pb-5">
            <h1 className="text-5xl font-semibold max-w-xl mx-auto text-center">
                <span className="text-red-500">Strengthen your security</span>, one password at a
                time.
            </h1>
            <p className="mt-5 text-center">
                Keep yourself safe online with this password generator.
            </p>
            <section className="my-10 sm:my-12 md:my-16 lg:my-20 flex flex-wrap justify-center gap-5">
                <Input ref={input} className="h-12 max-w-lg bg-foreground/5 block"></Input>
                <aside className="flex gap-2">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    onClick={() => GenPass({ input })}
                                    className="py-6 w-fit"
                                    aria-label="click to generate password"
                                >
                                    <RefreshCcwIcon />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Generate new password</p>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    onClick={() => WriteToClipboard({ input })}
                                    className="h-12"
                                    aria-label="click to copy password"
                                >
                                    <CopyIcon size={16} />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Copy to clipboard</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </aside>
            </section>
            <section>
                <strong className="block max-w-xl mx-auto text-center mb-5">
                    * Take what you need from the password, if a website limits password length then only
                    copy and paste the length of characters needed. *{" "}
                </strong>
                <section className="flex flex-col lg:flex-row gap-20 bg-foreground text-background p-5 rounded-md">
                    <article className="flex flex-col gap-3">
                        <h2 className="font-bold">Features</h2>
                        <ul className="ml-10 max-w-2xl flex flex-col gap-5">
                            <li>
                                <span className="font-bold">Randomness</span> - Generates passwords
                                with a mix of uppercase letters, lowercase letters, numbers, and
                                special characters to ensure high security.
                            </li>
                            <li>
                                <span className="font-bold">Clipboard Copy</span>- Conveniently
                                copies the generated password to the clipboard for easy pasting into
                                account setup or login forms.
                            </li>
                        </ul>
                    </article>
                    <article className="flex flex-col gap-3">
                        <h2 className="font-bold">Benefits</h2>
                        <ul className="ml-10 max-w-2xl flex flex-col gap-5">
                            <li>
                                Enhances security by reducing the risk of password-related breaches.
                            </li>
                            <li>
                                Saves time by quickly generating passwords that meet security
                                requirements.
                            </li>
                            <li>
                                Encourages the use of unique passwords for different accounts,
                                reducing the impact of potential security breaches.
                            </li>
                        </ul>
                    </article>
                </section>
            </section>
        </section>
    );
}
