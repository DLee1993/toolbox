import { useState, useRef } from "react";
import { GeneratePassword } from "@/lib/credentials-generator/generate-credentials";
import { TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy } from "@/lib/global/copy-to-clipboard";
import SelectLength from "@/components/credentials-generator/SelectLength";
import { CopyIcon, RefreshCcwIcon } from "lucide-react";

export default function Password() {
    const [pwLength, setPwLength] = useState<number>(8);
    const passwordInput = useRef<HTMLInputElement>(null);

    return (
        <TabsContent value="password" className="h-80">
            <div className="w-full h-full flex flex-col justify-center items-center max-w-2xl mx-auto space-y-28">
                <Input
                    readOnly
                    ref={passwordInput}
                    name="password input"
                    placeholder="]-[vPW}~'1=>"
                    className="min-h-20 !text-2xl text-center border-x-0 border-t-0 shadow-none"
                ></Input>
                <div className="w-full flex justify-between gap-2">
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
                        onClick={() => Copy({ input: passwordInput.current?.value || "" })}
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
