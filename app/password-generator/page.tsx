"use client";

import { useEffect, useRef } from "react";
import { GenPass } from "@/hooks/passwordGenerator/generate-password";
import { useToast } from "@/hooks/global/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CopyIcon, RefreshCcwIcon } from "lucide-react";
import { WriteToClipboard } from "@/hooks/global/copy-to-clipboard";

export default function PasswordGenerator() {
    const input = useRef<HTMLInputElement>(null);
    const { toast } = useToast();

    useEffect(() => GenPass({ input }), []);

    async function wrapperFunction({ input }: { input: React.RefObject<HTMLInputElement | null> }) {
        try {
            const result = await WriteToClipboard({ input });
            if (!result) {
                throw new Error("Unable to copy password to clipboard");
            }
            toast({ title: "Success", description: "Password copied to clipboard" });
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Unable to copy password, please try again later",
            });
        }
    }

    return (
        <section className="h-[calc(100vh-4rem)] md:h-screen flex flex-col justify-between items-center py-7 sm:py-8 md:py-9 lg:py-10">
            <article className="text-center">
                <h1 className="text-4xl">Generate secure passwords.</h1>
                <p className="mt-3 max-w-md">
                    Safeguard your online presence with random passwords and protect your valuable
                    data.
                </p>
            </article>
            <section className="w-full max-w-xl space-y-5">
                <Input
                    ref={input}
                    className="h-12 text-foreground text-center border border-foreground/25!"
                ></Input>
                <div className="flex gap-1 text-center">
                    <Button
                        onClick={() => GenPass({ input })}
                        className="h-12 w-full rounded-md bg-sidebar-accent/50 hover:bg-sidebar-accent text-sidebar-accent-foreground px-3.5 py-2.5 text-sm font-semibold shadow-xs transition-all cursor-pointer"
                        aria-label="click to generate password"
                    >
                        New password
                        <RefreshCcwIcon />
                    </Button>
                    <Button
                        onClick={() => wrapperFunction({ input })}
                        className="h-12 w-full rounded-md bg-sidebar-accent/50 hover:bg-sidebar-accent text-sidebar-accent-foreground px-3.5 py-2.5 text-sm font-semibold shadow-xs transition-all cursor-pointer"
                        aria-label="click to copy password"
                    >
                        Copy to clipboard
                        <CopyIcon size={16} />
                    </Button>
                </div>
            </section>
            <p className="mx-auto max-w-lg text-center text-sm font-semibold">
                Take what you need from the password, if a website limits password length then only
                copy and paste the length of characters needed.
            </p>
        </section>
    );
}
