/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction, useState } from "react";
import { GenerateQrCode } from "@/lib/qr-code-generator/generateQR";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function WIFI({ setValue }: { setValue: Dispatch<SetStateAction<string>> }) {
    const [wifi, setWifi] = useState({});

    function ProcessData({ type }: { type: string }) {
        const qrValue = GenerateQrCode({ value: wifi, type });

        setValue(qrValue as string);
    }

    const handleChange = ({ target }: any) => {
        setWifi((prev) => ({ ...prev, [target.name]: target.value }));
    };

    return (
        <div className="space-y-5">
            <fieldset className="relative">
                <Input
                    name="Network"
                    id="Network"
                    onChange={handleChange}
                    className="formField peer"
                    autoComplete="true"
                    placeholder=" "
                />
                <Label
                    htmlFor="Newtowrk"
                    className={`pointer-events-none absolute text-xs duration-300 transition-all bg-background transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 
                    peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-blue-600 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1`}
                >
                    Add network name
                </Label>
            </fieldset>
            <fieldset className="relative">
                <Input
                    name="NewtworkPassword"
                    id="NewtworkPassword"
                    onChange={handleChange}
                    className="formField peer"
                    autoComplete="true"
                    placeholder=" "
                    type="password"
                />
                <Label
                    htmlFor="NewtworkPassword"
                    className={`pointer-events-none absolute text-xs duration-300 transition-all bg-background transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 
                    peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-blue-600 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1`}
                >
                    Add network password
                </Label>
            </fieldset>
            <Button onClick={() => ProcessData({ type: "wifi" })}>Generate QR Code</Button>
        </div>
    );
}
