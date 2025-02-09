"use client";

import { useRef, useState } from "react";
import { GenPass, CodePass } from "@/hooks/credentialsGenerator/generate-credentials";
import { useToast } from "@/hooks/global/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CopyIcon, RefreshCcwIcon } from "lucide-react";
import { WriteToClipboard } from "@/hooks/global/copy-to-clipboard";
import { Separator } from "@/components/ui/separator";
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
    const { toast } = useToast();
    const [pinLength, setPinLength] = useState<string>("4");
    const pinLengthOptions = ["4", "5", "6", "7", "8", "9", "10", "11", "12"];

    async function NotifyUser(input: string) {
        try {
            const result = await WriteToClipboard({ input });
            if (!result) {
                throw new Error("Unable to copy to clipboard");
            }
            toast({ title: "Success", description: "Copied to clipboard" });
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Unable to copy to clipboard, please try again later",
            });
        }
    }

    return (
        <section className="minHeight customPadding flex flex-wrap gap-12">
            <article className="flex flex-col space-y-6 max-w-lg">
                <h1 className="text-3xl">Manage your privacy.</h1>
                <p>
                    Most people use predictable patterns when creating passwords and pin numbers,
                    like using <strong>personal information</strong> or{" "}
                    <strong>reusing passwords / pins</strong> and neglecting the use of{" "}
                    <strong>special characters</strong> in passwords.
                </p>
                <p>
                    To ensure your accounts are secure, our passwords use a combination of numbers,
                    uppercase / lowercase letters and special characters. Our pin codes are randomly
                    generated everytime.
                </p>
            </article>
            <section className="flex-1 flex flex-col items-center space-y-10 mt-10 md:mt-0">
                <section className="w-full max-w-lg space-y-5">
                    <h2>Generate a password</h2>
                    <Input
                        ref={passwordInput}
                        placeholder="194kfscmcaadDP$£%T$%Rlcdlsc"
                        className="h-12 text-foreground placeholder:opacity-50 font-medium tracking-[0.2rem] border-none"
                    ></Input>
                    <div className="flex gap-1 text-center">
                        <Button
                            onClick={() => GenPass({ input: passwordInput })}
                            className="h-12 w-full rounded-md bg-accent hover:bg-sidebar-accent text-sidebar-accent-foreground px-3.5 py-2.5 text-sm font-semibold shadow-xs transition-all cursor-pointer"
                            aria-label="click to generate password"
                        >
                            Generate password
                            <RefreshCcwIcon />
                        </Button>
                        <Button
                            onClick={() => NotifyUser(passwordInput.current?.value || "")}
                            className="h-12 w-full rounded-md bg-accent hover:bg-sidebar-accent text-sidebar-accent-foreground px-3.5 py-2.5 text-sm font-semibold shadow-xs transition-all cursor-pointer"
                            aria-label="click to copy password"
                        >
                            Copy to clipboard
                            <CopyIcon size={16} />
                        </Button>
                    </div>
                </section>
                <Separator />
                <section className="w-full max-w-lg space-y-5">
                    <h2>Generate a pin code</h2>
                    <Select onValueChange={setPinLength}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select pin length" />
                        </SelectTrigger>
                        <SelectContent>
                            {pinLengthOptions.map((option, index) => (
                                <SelectItem key={index} value={option}>
                                    {option}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Input
                        ref={pinInput}
                        placeholder="1403"
                        className="h-12 text-foreground placeholder:opacity-50 font-medium tracking-[0.2rem] border-none"
                    ></Input>
                    <div className="flex gap-1 text-center">
                        <Button
                            onClick={() => CodePass({ input: pinInput, length: pinLength })}
                            className="h-12 w-full rounded-md bg-accent hover:bg-sidebar-accent text-sidebar-accent-foreground px-3.5 py-2.5 text-sm font-semibold shadow-xs transition-all cursor-pointer"
                            aria-label="click to generate password"
                        >
                            Generate code
                            <RefreshCcwIcon />
                        </Button>
                        <Button
                            onClick={() => NotifyUser(pinInput.current?.value || "")}
                            className="h-12 w-full rounded-md bg-accent hover:bg-sidebar-accent text-sidebar-accent-foreground px-3.5 py-2.5 text-sm font-semibold shadow-xs transition-all cursor-pointer"
                            aria-label="click to copy password"
                        >
                            Copy to clipboard
                            <CopyIcon size={16} />
                        </Button>
                    </div>
                </section>
            </section>
        </section>
    );
}
