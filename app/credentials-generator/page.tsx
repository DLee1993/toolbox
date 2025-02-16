"use client";

import { useRef, useState } from "react";
import { GeneratePassword, GenerateCode } from "@/hooks/credentials-generator/generate-credentials";
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

export default function CredentialsGenerator() {
    const { toast } = useToast();
    const passwordInput = useRef<HTMLInputElement>(null);
    const pinInput = useRef<HTMLInputElement>(null);
    const [passwordLength, setPasswordLength] = useState<string>("12");
    const [pinLength, setPinLength] = useState<string>("5");
    const passwordLengthOptions = new Array(13).fill(0).map((_, idx) => idx + 12);
    const pinLengthOptions = ["5", "6", "7", "8", "9", "10", "11", "12"];

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
    };

    return (
        <section className="minHeight customYPadding">
            <article className="w-full flex flex-col justify-center items-center space-y-6">
                <h1 className="text-4xl">Manage your privacy.</h1>
                <p className="max-w-xl text-center">
                    To ensure your accounts are secure, our passwords use a combination of{" "}
                    <span className="text-primary">numbers</span>,{" "}
                    <span className="text-primary">uppercase / lowercase</span> letters and{" "}
                    <span className="text-primary">special characters</span>.
                    <br /> <br /> Our pin codes are randomly generated everytime.
                </p>
            </article>
            <section className="grid grid-cols-1 md:grid-cols-2 max-w-6xl mx-auto gap-10 mt-20">
                <section className="flex-1 w-full max-w-lg space-y-5">
                    <div className="flex justify-between items-start">
                        <h2>Generate a password</h2>
                        <Select onValueChange={setPasswordLength}>
                            <SelectTrigger className="w-[150px] h-6 border-none">
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
                    </div>
                    <Input
                        readOnly
                        ref={passwordInput}
                        placeholder="e.g. 194kfscmcaadDP$£%T$%Rlcdlsc"
                        className="h-12 text-foreground placeholder:opacity-50 font-medium tracking-[0.2rem]"
                    ></Input>
                    <div className="flex gap-1 text-center">
                        <Button
                            onClick={() =>
                                GeneratePassword({ input: passwordInput, length: passwordLength })
                            }
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
                        placeholder="e.g. 1403"
                        className="h-12 w-[160px] text-foreground placeholder:opacity-50 font-medium tracking-[0.2rem]"
                    ></Input>
                    <div className="flex gap-1 text-center">
                        <Button
                            onClick={() => GenerateCode({ input: pinInput, length: pinLength })}
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
