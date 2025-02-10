"use client";

import { useRef, useState } from "react";
import { GenPass, CodePass } from "@/hooks/credentialsGenerator/generate-credentials";
import { useToast } from "@/hooks/global/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CopyIcon, RefreshCcwIcon } from "lucide-react";
import { WriteToClipboard } from "@/hooks/global/copy-to-clipboard";
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
    const { toast } = useToast();
    const [pinLength, setPinLength] = useState<string>("4");
    const pinLengthOptions = ["4","5", "6", "7", "8", "9", "10", "11", "12"];

    const NotifyUser = async (input: string) => {
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
        <section className="minHeight customPadding space-y-10">
            <article className="w-full flex flex-col justify-center items-center space-y-6">
                <h1 className="text-4xl">Manage your privacy.</h1>
                <p className="max-w-xl text-center">
                    To ensure your accounts are secure, our passwords use a combination of{" "}
                    <span className="text-accent">numbers</span>,{" "}
                    <span className="text-accent">uppercase / lowercase</span> letters and{" "}
                    <span className="text-accent">special characters</span>.
                    <br /> <br /> Our pin codes are randomly generated everytime.
                </p>
            </article>
            <Separator />
            <section className="flex flex-wrap justify-between items-center gap-10">
                <section className="flex-1 w-full max-w-lg space-y-5">
                    <h2>Generate a password</h2>
                    <Input
                        readOnly
                        ref={passwordInput}
                        placeholder="e.g. 194kfscmcaadDP$£%T$%Rlcdlsc"
                        className="h-12 text-foreground placeholder:opacity-50 font-medium tracking-[0.2rem]"
                    ></Input>
                    <div className="flex gap-1 text-center">
                        <Button
                            onClick={() => GenPass({ input: passwordInput })}
                            aria-label="click to generate password"
                        >
                            Refresh
                            <RefreshCcwIcon />
                        </Button>
                        <Button
                            onClick={() => NotifyUser(passwordInput.current?.value || "")}
                            aria-label="click to copy password"
                        >
                            Copy to clipboard
                            <CopyIcon size={16} />
                        </Button>
                    </div>
                </section>
                <section className="flex-1 w-full max-w-lg space-y-5">
                    <div className="flex justify-between items-start">
                        <h2>Generate a pin code</h2>
                        <Select onValueChange={setPinLength}>
                            <SelectTrigger className="w-[150px] h-6 border-none">
                                <SelectValue placeholder="Code length" />
                            </SelectTrigger>
                            <SelectContent>
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
                        placeholder="e.g. 1403"
                        className="h-12 w-[160px] text-foreground placeholder:opacity-50 font-medium tracking-[0.2rem]"
                    ></Input>
                    <div className="flex gap-1 text-center">
                        <Button
                            onClick={() => CodePass({ input: pinInput, length: pinLength })}
                            aria-label="click to generate password"
                        >
                            Refresh
                            <RefreshCcwIcon />
                        </Button>
                        <Button
                            onClick={() => NotifyUser(pinInput.current?.value || "")}
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
