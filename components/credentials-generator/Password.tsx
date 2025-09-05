import { useEffect, useState } from "react";
import { GeneratePassword } from "@/lib/credentials-generator/generate-credentials";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Copy } from "@/lib/global/copy-to-clipboard";
import SelectLength from "@/components/credentials-generator/SelectLength";
import { CopyIcon, RefreshCcwIcon } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

export default function Password() {
    const [pwLength, setPwLength] = useState<number>(8);
    const [passwordInput, setPasswordInput] = useState<string>("");
    const inputs = Array.from({ length: pwLength }, (_, i) => passwordInput[i] || "");

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
            <div className="min-h-80 flex flex-col justify-center items-center max-w-[550px] mx-auto space-y-20">
                <InputOTP maxLength={pwLength} readOnly value={passwordInput}>
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
                <div className="flex gap-4">
                    <SelectLength type="password" pwLength={pwLength} setPwLength={setPwLength} />
                    <Button
                        id="password"
                        onClick={() => GenerateCredentials(pwLength)}
                        aria-label="click to generate password"
                        className="clickAnim w-40"
                        type="button"
                    >
                        Generate <RefreshCcwIcon />
                    </Button>
                    <Button
                        className="clickAnim w-fit"
                        variant="outline"
                        onClick={() => Copy({ input: passwordInput || "" })}
                        aria-label="click to copy password"
                        type="button"
                    >
                        <CopyIcon size={16} />
                    </Button>
                </div>
            </div>
        </TabsContent>
    );
}
