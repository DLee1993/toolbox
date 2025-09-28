import { useEffect, useState } from "react";
import { GeneratePassword } from "@/lib/credentials-generator/generate-credentials";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Copy } from "@/lib/global/copy-to-clipboard";
import SelectLength from "@/components/credentials-generator/SelectLength";
import { CopyIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Password() {
    const [pwLength, setPwLength] = useState<number>(8);
    const [passwordInput, setPasswordInput] = useState<string>("");

    function GenerateCredentials(length: number) {
        const password = GeneratePassword(length);
        if (password) {
            setPasswordInput(password);
        }
    }

    useEffect(() => {
        setPasswordInput("");
    }, [pwLength]);

    return (
        <TabsContent value="password">
            <div className="flex flex-col py-2 space-y-16">
                <div className="space-y-5">
                    <h3>Select your password length</h3>
                    <SelectLength type="password" pwLength={pwLength} setPwLength={setPwLength} />
                </div>
                <Input
                    maxLength={pwLength}
                    readOnly
                    value={passwordInput}
                    className=" max-w-md !text-xl border-x-0 border-t-0 border-background/50 tracking-widest"
                ></Input>

                {/* Password Controls */}
                <div className="flex gap-4 w-full">
                    <Button
                        id="password"
                        onClick={() => GenerateCredentials(pwLength)}
                        aria-label="click to generate password"
                        className="clickAnim w-full"
                        type="button"
                    >
                        Generate Password
                    </Button>
                    <Button
                        className="clickAnim w-full text-foreground"
                        variant="outline"
                        onClick={() => Copy({ input: passwordInput || "" })}
                        aria-label="click to copy password"
                        type="button"
                    >
                        Copy password
                        <CopyIcon size={16} />
                    </Button>
                </div>
            </div>
        </TabsContent>
    );
}
