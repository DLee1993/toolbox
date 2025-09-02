import { useState, useRef } from "react";
import { GeneratePin } from "@/lib/credentials-generator/generate-credentials";
import { TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy } from "@/lib/global/copy-to-clipboard";
import SelectLength from "@/components/credentials-generator/SelectLength";
import { CopyIcon, RefreshCcwIcon } from "lucide-react";

export default function Pin() {
    const [pcLength, setPcLength] = useState<number>(6);
    const codeInput = useRef<HTMLInputElement>(null);

    function GenerateCredentials(length: number) {
        const pin = GeneratePin(length);
        if (codeInput.current) {
            codeInput.current.value = pin;
        }
    }

    return (
        <TabsContent value="code" className="h-80">
            <div className="w-full h-full flex flex-col justify-center items-center max-w-2xl mx-auto space-y-28">
                <Input
                    readOnly
                    ref={codeInput}
                    name="code input"
                    placeholder="493028"
                    className="min-h-20 !text-2xl text-center border-x-0 border-t-0 shadow-none"
                ></Input>
                <div className="w-full flex justify-between gap-2">
                    <SelectLength type="code" setPcLength={setPcLength} />
                    <Button
                        id="password"
                        onClick={() => GenerateCredentials(pcLength)}
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
    );
}
