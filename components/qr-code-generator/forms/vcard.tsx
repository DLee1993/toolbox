/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction, useState } from "react";
import { GenerateQrCode } from "@/lib/qr-code-generator/generateQR";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function VCARD({ setValue }: { setValue: Dispatch<SetStateAction<string>> }) {
    const [vcard, setVCard] = useState({});

    function ProcessData({ type }: { type: string }) {
        const qrValue = GenerateQrCode({ value: vcard, type });

        setValue(qrValue as string);
    }

    const handleChange = ({ target }: any) => {
        setVCard((prev) => ({ ...prev, [target.name]: target.value }));
    };

    return (
        <div className="space-y-5">
            <div className="flex justify-between gap-2">
                <fieldset className="relative flex-1">
                    <Input
                        name="FirstName"
                        id="FirstName"
                        onChange={handleChange}
                        className="formField peer"
                        autoComplete="true"
                        placeholder=" "
                    />
                    <Label
                        htmlFor="FirstName"
                        className={`pointer-events-none absolute text-xs duration-300 transition-all bg-background transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 
                    peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-blue-600 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1`}
                    >
                        First Name
                    </Label>
                </fieldset>
                <fieldset className="relative flex-1">
                    <Input
                        name="LastName"
                        id="LastName"
                        onChange={handleChange}
                        className="formField peer"
                        autoComplete="true"
                        placeholder=" "
                    />
                    <Label
                        htmlFor="LastName"
                        className={`pointer-events-none absolute text-xs duration-300 transition-all bg-background transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 
                    peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-blue-600 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1`}
                    >
                        Last Name
                    </Label>
                </fieldset>
            </div>
            <fieldset className="relative">
                <Input
                    name="Tel"
                    id="Tel"
                    onChange={handleChange}
                    className="formField peer"
                    autoComplete="true"
                    placeholder=" "
                />
                <Label
                    htmlFor="Tel"
                    className={`pointer-events-none absolute text-xs duration-300 transition-all bg-background transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 
                    peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-blue-600 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1`}
                >
                    Contact Number
                </Label>
            </fieldset>
            <fieldset className="relative">
                <Input
                    name="Email"
                    id="Email"
                    onChange={handleChange}
                    className="formField peer"
                    autoComplete="true"
                    placeholder=" "
                />
                <Label
                    htmlFor="Email"
                    className={`pointer-events-none absolute text-xs duration-300 transition-all bg-background transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 
                    peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-blue-600 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1`}
                >
                    Email Address
                </Label>
            </fieldset>
            <div className="flex justify-between gap-2">
                <fieldset className="relative flex-1">
                    <Input
                        name="Company"
                        id="Company"
                        onChange={handleChange}
                        className="formField peer"
                        autoComplete="true"
                        placeholder=" "
                    />
                    <Label
                        htmlFor="Company"
                        className={`pointer-events-none absolute text-xs duration-300 transition-all bg-background transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 
                    peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-blue-600 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1`}
                    >
                        Company Name
                    </Label>
                </fieldset>
                <fieldset className="relative flex-1">
                    <Input
                        name="Website"
                        id="Website"
                        onChange={handleChange}
                        className="formField peer"
                        autoComplete="true"
                        placeholder=" "
                    />
                    <Label
                        htmlFor="Website"
                        className={`pointer-events-none absolute text-xs duration-300 transition-all bg-background transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 
                    peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-blue-600 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1`}
                    >
                        Website
                    </Label>
                </fieldset>
            </div>
            <Button onClick={() => ProcessData({ type: "vcard" })}>Generate QR Code</Button>
        </div>
    );
}
