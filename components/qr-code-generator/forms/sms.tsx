/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { GenerateQrCode } from "@/lib/qr-code-generator/generateQR";
import { Dispatch, SetStateAction, useState } from "react";

export default function SMS({ setValue }: { setValue: Dispatch<SetStateAction<string>> }) {
    const [sms, setSms] = useState({});

    function ProcessData({ type }: { type: string }) {
        const qrValue = GenerateQrCode({ value: sms, type });

        setValue(qrValue as string);
    }

    const handleChange = ({ target }: any) => {
        setSms((prev) => ({ ...prev, [target.name]: target.value }));
    };

    return (
        <div className="space-y-5">
            <div className="flex justify-between gap-2">
                <fieldset className="relative flex-1">
                    <Input
                        name="Number"
                        id="Number"
                        onChange={handleChange}
                        className="formField peer"
                        autoComplete="true"
                        placeholder=" "
                    />
                    <Label
                        htmlFor="Number"
                        className={`pointer-events-none absolute text-xs duration-300 transition-all bg-background transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 
                    peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-blue-600 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1`}
                    >
                        Phone Number
                    </Label>
                </fieldset>
            </div>
            <fieldset className="relative">
                <Textarea
                    name="Body"
                    id="Body"
                    onChange={handleChange}
                    className="formField peer resize-none h-32"
                    autoComplete="true"
                    placeholder=" "
                />
                <Label
                    htmlFor="Body"
                    className={`pointer-events-none absolute text-xs duration-300 transition-all bg-background transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 
                    peer-placeholder-shown:top-6 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-blue-600 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1`}
                >
                    Message
                </Label>
            </fieldset>
            <Button onClick={() => ProcessData({ type: "sms" })}>Generate QR Code</Button>
        </div>
    );
}
