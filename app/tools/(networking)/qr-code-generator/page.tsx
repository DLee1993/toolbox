/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef, useState } from "react";
import { QRCode } from "react-qrcode-logo";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QRCodeSettings from "@/components/qr-code-generator/QRCodeSettings";
import QRCodeTypes from "@/components/qr-code-generator/QRCodeTypes";
import { Button } from "@/components/ui/button";

export default function QRCodeGenerator() {
    const [qrcodeValue, setQrCodeValue] = useState("");
    const [qrProps, setQrProps] = useState<{ [key: string]: any }>({
        logoOpacity: "0.5",
        enableCORS: true,
        ecLevel: "Q",
    });

    const ref = useRef<QRCode>(null);

    const handleChange = ({ target }: any) => {
        setQrProps((prev) => ({ ...prev, [target.name]: target.value }));
    };

    const handleDownload = () => {
        ref.current?.download();
    };

    return (
        <section className="relative py-10 w-full flex justify-between flex-wrap gap-10">
            <Tabs defaultValue="Type" className="w-full max-w-xl">
                <TabsList className="grid w-full h-fit grid-cols-2 bg-muted/50">
                    <TabsTrigger
                        value="Type"
                        className="px-4 py-2 data-[state=active]:bg-muted shadow-none"
                    >
                        Type
                    </TabsTrigger>
                    <TabsTrigger
                        value="Customisation"
                        className="px-4 py-2 data-[state=active]:bg-muted shadow-none"
                    >
                        Customisation
                    </TabsTrigger>
                </TabsList>
                <QRCodeSettings qrProps={qrProps} handleChange={handleChange} />
                <QRCodeTypes setValue={setQrCodeValue} />
            </Tabs>
            <section className="lg:sticky top-28 h-fit flex flex-col items-center flex-1 space-y-10">
                <QRCode
                    ref={ref}
                    value={qrcodeValue}
                    {...{
                        ...qrProps,
                        eyeRadius: [
                            // build eyeRadius manually
                            {
                                outer: [
                                    qrProps.eyeradius_0_outer_0,
                                    qrProps.eyeradius_0_outer_1,
                                    qrProps.eyeradius_0_outer_2,
                                    qrProps.eyeradius_0_outer_3,
                                ],
                                inner: [
                                    qrProps.eyeradius_0_inner_0,
                                    qrProps.eyeradius_0_inner_1,
                                    qrProps.eyeradius_0_inner_2,
                                    qrProps.eyeradius_0_inner_3,
                                ],
                            },
                            {
                                outer: [
                                    qrProps.eyeradius_1_outer_0,
                                    qrProps.eyeradius_1_outer_1,
                                    qrProps.eyeradius_1_outer_2,
                                    qrProps.eyeradius_1_outer_3,
                                ],
                                inner: [
                                    qrProps.eyeradius_1_inner_0,
                                    qrProps.eyeradius_1_inner_1,
                                    qrProps.eyeradius_1_inner_2,
                                    qrProps.eyeradius_1_inner_3,
                                ],
                            },
                            {
                                outer: [
                                    qrProps.eyeradius_2_outer_0,
                                    qrProps.eyeradius_2_outer_1,
                                    qrProps.eyeradius_2_outer_2,
                                    qrProps.eyeradius_2_outer_3,
                                ],
                                inner: [
                                    qrProps.eyeradius_2_inner_0,
                                    qrProps.eyeradius_2_inner_1,
                                    qrProps.eyeradius_2_inner_2,
                                    qrProps.eyeradius_2_inner_3,
                                ],
                            },
                        ],
                        eyeColor: [
                            // build eyeColor manually
                            {
                                outer: qrProps.eyecolor_0_outer ?? qrProps.fgColor ?? "#000000",
                                inner: qrProps.eyecolor_0_inner ?? qrProps.fgColor ?? "#000000",
                            },
                            {
                                outer: qrProps.eyecolor_1_outer ?? qrProps.fgColor ?? "#000000",
                                inner: qrProps.eyecolor_1_inner ?? qrProps.fgColor ?? "#000000",
                            },
                            {
                                outer: qrProps.eyecolor_2_outer ?? qrProps.fgColor ?? "#000000",
                                inner: qrProps.eyecolor_2_inner ?? qrProps.fgColor ?? "#000000",
                            },
                        ],
                    }}
                />
                <Button type="button" onClick={handleDownload}>
                    Download QR Code
                </Button>
            </section>
        </section>
    );
}
