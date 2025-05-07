/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef, useState } from "react";
import { QRCode } from "react-qrcode-logo";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QRCodeSettings from "@/components/qr-code-generator/QRCodeSettings";
import QRCodeTypes from "@/components/qr-code-generator/QRCodeTypes";
import { Button } from "@/components/ui/button";

// test data - https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf

export default function QRCodeGenerator() {
    const [qrcodeValue, setQrCodeValue] = useState("https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf");
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

/* Use shadcn tabs to toggle between all inputs */

/**

qrProps object required
-----------------------

const vcardexample = `BEGIN:VCARD
VERSION:3.0
FN:John Doe
TEL:+1234567890
EMAIL:johndoe@example.com
END:VCARD`;


const emailexample = `mailto:dai180293@gmail.com?subject=free chocolate&body=testing212`;

const smsexample = `<a href="sms:+1234567890?body=Hello%20there!" target="_blank">Send a Text</a>`; 

const wifiexample = `<a href="wifi:S:MyNetwork;T:WPA;P:MyPassword;;">Connect to Wi-Fi</a>`

const image = `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA..." alt="Embedded Image">`

qrProps string required
----------------------

const urlexample = `https://www.google.com`;

const socialmediaprofile = `https://www.facebook.com/dai180293`;

const pdf = `https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf`






 */

/*

? These are all the values you can add to the qr code

"root":{28 items
"value":string"testing 12345"
"ecLevel":string"H"
"size":string"219"
"quietZone":string"38"
"bgColor":string"#ff0000"
"fgColor":string"#ffffff"
"qrStyle":string"dots"
"logoPaddingStyle":string"square"
"eyeradius_0_outer_0":string"9"
"eyeradius_0_outer_1":string"9"
"eyeradius_0_outer_2":string"10"
"eyeradius_0_outer_3":string"10"
"eyeradius_1_outer_0":string"12"
"eyeradius_1_outer_1":string"12"
"eyeradius_1_outer_2":string"14"
"eyeradius_1_outer_3":string"14"
"eyecolor_0_outer":string"#3700ff"
"eyecolor_1_outer":string"#00ff6e"
"eyecolor_2_outer":string"#eeff00"
"eyecolor_0_inner":string"#d4ff00"
"eyecolor_1_inner":string"#00aaff"
"eyecolor_2_inner":string"#ff00c8"
"logoImage":string"data:image/png;base64,base64StringGoesHere"
"logoOpacity":string"1"
"logoWidth":string"20"
"logoHeight":string"20"
"removeQrCodeBehindLogo":booltrue
"logoPadding":string"20"
}

*/
