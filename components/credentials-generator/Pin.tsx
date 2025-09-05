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
            <div className="min-h-80 flex flex-col justify-center items-center max-w-[450px] mx-auto space-y-20">
                <InputOTP maxLength={pcLength} readOnly value={codeInput}>
                    <InputOTPGroup className="gap-1 flex flex-wrap justify-center">
                        {inputs.map((char, index) => (
                            <InputOTPSlot
                                index={index}
                                key={index}
                                className="border h-12 w-12 rounded text-lg font-medium"
                            >
                                {char}
                            </InputOTPSlot>
                        ))}
                    </InputOTPGroup>
                </InputOTP>

                {/* Password Controls */}
                <div className="flex gap-2">
                    <SelectLength type="code" pcLength={pcLength} setPcLength={setPcLength} />
                    <Button
                        id="code"
                        onClick={() => GenerateCredentials(pcLength)}
                        aria-label="click to generate password"
                        className="clickAnim w-fit"
                        type="button"
                    >
                        Generate <RefreshCcwIcon />
                    </Button>
                    <Button
                        className="clickAnim w-fit"
                        variant="outline"
                        onClick={() => Copy({ input: codeInput || "" })}
                        aria-label="click to copy password"
                        type="button"
                    >
                        Copy <CopyIcon size={16} />
                    </Button>
                </div>
            </div>
        </TabsContent>
    );
}
