import { useEffect, useState } from "react";
import { GeneratePin } from "@/lib/credentials-generator/generate-credentials";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Copy } from "@/lib/global/copy-to-clipboard";
import SelectLength from "@/components/credentials-generator/SelectLength";
import { CopyIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Pin() {
    const [pcLength, setPcLength] = useState<number>(6);
    const [codeInput, setCodeInput] = useState<string>("");

    function GenerateCredentials(length: number) {
        const pin = GeneratePin(length);
        if (pin) {
            setCodeInput(pin);
        }
    }

    useEffect(() => {
        setCodeInput("");
    }, [pcLength]);

    return (
        <TabsContent value="code">
            <div className="flex flex-col py-2 space-y-16">
                <div className="space-y-5">
                    <h3>Select your pin code length</h3>
                    <SelectLength type="code" pcLength={pcLength} setPcLength={setPcLength} />
                </div>
                <Input
                    maxLength={pcLength}
                    readOnly
                    value={codeInput}
                    className="!text-3xl text-accent-foreground border-x-0 border-t-0 border-border tracking-widest rounded-none"
                ></Input>

                {/* Password Controls */}
                <div className="flex gap-4 w-full">
                    <Button
                        id="password"
                        onClick={() => GenerateCredentials(pcLength)}
                        aria-label="click to generate password"
                        className="clickAnim w-full"
                        type="button"
                    >
                        Generate Credential
                    </Button>
                    <Button
                        className="clickAnim w-full text-foreground"
                        variant="outline"
                        onClick={() => Copy({ input: codeInput || "" })}
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
