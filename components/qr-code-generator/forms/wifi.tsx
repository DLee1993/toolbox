/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction, useState } from "react";
import { GenerateQrCode } from "@/lib/qr-code-generator/generateQR";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function WIFI({ setValue }: { setValue: Dispatch<SetStateAction<string>> }) {
    const [wifi, setWifi] = useState({ EncryptionType: "WPA", Hidden: "NO" });

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
                    htmlFor="Network"
                    className={`pointer-events-none absolute text-xs duration-300 transition-all bg-background transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 
                    peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-blue-600 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1`}
                >
                    Network name / SSID
                </Label>
            </fieldset>
            {wifi.EncryptionType !== "NONE" && (
                <fieldset className="relative">
                    <Input
                        name="NetworkPassword"
                        id="NetworkPassword"
                        onChange={handleChange}
                        className="formField peer"
                        autoComplete="true"
                        placeholder=" "
                        type="password"
                    />
                    <Label
                        htmlFor="NetworkPassword"
                        className={`pointer-events-none absolute text-xs duration-300 transition-all bg-background transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 
                    peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-blue-600 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1`}
                    >
                        Network password
                    </Label>
                </fieldset>
            )}
            <div className="flex justify-between flex-wrap pb-5">
                <fieldset className="space-y-5">
                    <p className="text-xs">Encryption type</p>
                    <RadioGroup
                        defaultValue="WPA"
                        onValueChange={(value) => setWifi({ ...wifi, EncryptionType: value })}
                        className="flex space-x-5"
                        name="Encryption"
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="NONE" id="r1" />
                            <Label htmlFor="r1" className="text-xs font-semibold">
                                NONE
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="WPA" id="r2" />
                            <Label htmlFor="r2" className="text-xs font-semibold">
                                WPA/WPA2
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="WEP" id="r3" />
                            <Label htmlFor="r3" className="text-xs font-semibold">
                                WEP
                            </Label>
                        </div>
                    </RadioGroup>
                </fieldset>
                <fieldset className="space-y-5">
                    <p className="text-xs">Hidden Network</p>
                    <RadioGroup
                        defaultValue="NO"
                        onValueChange={(value) => setWifi({ ...wifi, Hidden: value })}
                        className="flex space-x-5"
                        name="Encryption"
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="NO" id="r1" />
                            <Label htmlFor="r1" className="text-xs font-semibold">
                                NO
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="YES" id="r2" />
                            <Label htmlFor="r2" className="text-xs font-semibold">
                                YES
                            </Label>
                        </div>
                    </RadioGroup>
                </fieldset>
            </div>
            <Button onClick={() => ProcessData({ type: "wifi" })}>Generate QR Code</Button>
        </div>
    );
}
