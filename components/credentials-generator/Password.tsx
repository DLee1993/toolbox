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
                    className="!text-3xl text-accent-foreground border-x-0 border-t-0 border-border tracking-widest rounded-none"
                ></Input>

                {/* Password Controls */}
                <div className="flex gap-4 w-full flex-wrap">
                    <Button
                        id="password"
                        onClick={() => GenerateCredentials(pwLength)}
                        aria-label="click to generate password"
                        className="clickAnim flex-1 min-w-40"
                        type="button"
                    >
                        Generate Credential
                    </Button>
                    <Button
                        className="clickAnim text-foreground flex-1 min-w-40"
                        variant="outline"
                        onClick={() => Copy({ input: passwordInput || "" })}
                        aria-label="click to copy password"
                        type="button"
                    >
                        Copy to clipboard
                        <CopyIcon size={16} />
                    </Button>
                </div>
            </div>
        </TabsContent>
    );
}
