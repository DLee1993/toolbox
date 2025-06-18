"use client";

import { useRef, useState } from "react";
import { GeneratePassword, GenerateCode } from "@/lib/credentials-generator/generate-credentials";
import { Copy } from "@/lib/global/copy-to-clipboard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CopyIcon, RefreshCcwIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface LengthProps {
    type: string;
    setPwLength?: React.Dispatch<React.SetStateAction<number>>;
    setPcLength?: React.Dispatch<React.SetStateAction<number>>;
}

const SelectLength = ({ type, setPwLength, setPcLength }: LengthProps) => {
    const pwLengthOptions = Array.from({ length: 30 - 8 + 1 }, (_, i) => i + 8);
    const pcLengthOptions = Array.from({ length: 16 - 4 + 1 }, (_, i) => i + 4);

    return (
        <Select
            defaultValue={
                type === "password" ? pwLengthOptions[0].toString() : pcLengthOptions[0].toString()
            }
            onValueChange={(value) => {
                if (type === "password" && setPwLength) {
                    setPwLength(Number(value));
                } else if (type === "code" && setPcLength) {
                    setPcLength(Number(value));
                }
            }}
        >
            <SelectTrigger className="w-16 capitalize">
                <SelectValue placeholder={`${type} Length`} />
            </SelectTrigger>
            <SelectContent className="h-80">
                <SelectGroup>
                    <SelectLabel>Select Length Required</SelectLabel>
                    {type === "password"
                        ? pwLengthOptions.map((option, i) => (
                              <SelectItem key={i} value={option.toString()}>
                                  {option}
                              </SelectItem>
                          ))
                        : pcLengthOptions.map((option, i) => (
                              <SelectItem key={i} value={option.toString()}>
                                  {option}
                              </SelectItem>
                          ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default function CredentialsGenerator() {
    const [pwLength, setPwLength] = useState<number>(8);
    const [pcLength, setPcLength] = useState<number>(4);

    const passwordInput = useRef<HTMLInputElement>(null);
    const codeInput = useRef<HTMLInputElement>(null);

    return (
        <section className="height">
            <section className="p-5">
                <Tabs defaultValue="password">
                    <TabsList className="h-10 w-full justify-start bg-transparent gap-5">
                        <TabsTrigger
                            value="password"
                            className="rounded-none bg-background w-full md:w-auto h-full px-0 data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary"
                        >
                            Password
                        </TabsTrigger>
                        <TabsTrigger
                            value="code"
                            className="rounded-none bg-background w-full md:w-auto h-full px-0 data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary"
                        >
                            Pin Code
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="password" className="py-10">
                        <div className="max-w-xl mx-auto space-y-28">
                            <Input
                                readOnly
                                ref={passwordInput}
                                name="password input"
                                placeholder="]-[vPW}~'1=>"
                                className="min-h-20 !text-2xl max-w-xl mx-auto text-center border-x-0 border-t-0 shadow-none"
                            ></Input>
                            <div className="flex justify-between gap-2">
                                <SelectLength type="password" setPwLength={setPwLength} />
                                <Button
                                    id="password"
                                    onClick={() =>
                                        GeneratePassword({
                                            input: passwordInput,
                                            length: pwLength,
                                        })
                                    }
                                    aria-label="click to generate password"
                                    className="clickAnim w-fit flex-1"
                                    type="button"
                                >
                                    Generate <RefreshCcwIcon />
                                </Button>
                                <Button
                                    className="clickAnim w-fit"
                                    variant="outline"
                                    onClick={() =>
                                        Copy({ input: passwordInput.current?.value || "" })
                                    }
                                    aria-label="click to copy password"
                                    type="button"
                                >
                                    Copy <CopyIcon size={16} />
                                </Button>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="code" className="py-10">
                        <div className="max-w-xl mx-auto space-y-28">
                            <Input
                                readOnly
                                ref={codeInput}
                                name="code input"
                                placeholder="49302"
                                className="min-h-20 !text-2xl text-center border-x-0 border-t-0 shadow-none"
                            ></Input>
                            <div className="flex justify-between gap-2">
                                <SelectLength type="code" setPcLength={setPcLength} />
                                <Button
                                    id="password"
                                    onClick={() =>
                                        GenerateCode({
                                            input: codeInput,
                                            length: pcLength,
                                        })
                                    }
                                    aria-label="click to generate code"
                                    className="clickAnim w-fit flex-1"
                                    type="button"
                                >
                                    Generate <RefreshCcwIcon />
                                </Button>
                                <Button
                                    className="clickAnim w-fit"
                                    variant="outline"
                                    onClick={() => Copy({ input: codeInput.current?.value || "" })}
                                    aria-label="click to copy code"
                                    type="button"
                                >
                                    Copy <CopyIcon size={16} />
                                </Button>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </section>
        </section>
    );
}
