import { useEffect, useState } from "react";
import { GeneratePin } from "@/lib/credentials-generator/generate-credentials";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Copy } from "@/lib/global/copy-to-clipboard";
import SelectLength from "@/components/credentials-generator/SelectLength";
import { CopyIcon, RefreshCcwIcon } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

export default function Pin() {
    const [pcLength, setPcLength] = useState<number>(6);
    const [codeInput, setCodeInput] = useState<string>("");
    const inputs = Array.from({ length: pcLength }, (_, i) => codeInput[i] || "");

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
            <div className="min-h-80 w-11/12 flex flex-col justify-around items-center mx-auto py-2 space-y-16">
                <InputOTP maxLength={pcLength} readOnly value={codeInput}>
                    <InputOTPGroup className="gap-1 flex flex-wrap justify-center">
                        {inputs.map((char, index) => (
                            <InputOTPSlot
                                index={index}
                                key={index}
                                className="border border-foreground h-20 w-14 rounded text-2xl font-medium"
                            >
                                {char}
                            </InputOTPSlot>
                        ))}
                    </InputOTPGroup>
                </InputOTP>

                {/* Password Controls */}
                <div className="flex gap-4">
                    <SelectLength type="code" pcLength={pcLength} setPcLength={setPcLength} />
                    <Button
                        id="code"
                        onClick={() => GenerateCredentials(pcLength)}
                        aria-label="click to generate password"
                        className="clickAnim w-40"
                        type="button"
                    >
                        Generate <RefreshCcwIcon />
                    </Button>
                    <Button
                        className="clickAnim w-fit"
                        variant="outline"
                        onClick={() => Copy({ input: codeInput || "" })}
                        aria-label="click to copy pin code"
                        type="button"
                    >
                        <CopyIcon size={16} />
                    </Button>
                </div>
            </div>
        </TabsContent>
    );
}
