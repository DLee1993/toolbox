/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction, useState } from "react";
import { Input } from "@/components/ui/input";
import { GenerateQrCode } from "@/lib/qr-code-generator/generateQR";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function LOCATION({ setValue }: { setValue: Dispatch<SetStateAction<string>> }) {
    const [location, setLocation] = useState({});

    function ProcessData({ type }: { type: string }) {
        const qrValue = GenerateQrCode({ value: location, type });

        setValue(qrValue as string);
    }

    const handleChange = ({ target }: any) => {
        setLocation((prev) => ({ ...prev, [target.name]: target.value }));
    };

    return (
        <div className="space-y-5">
            <fieldset className="relative">
                <Input
                    name="Latitude"
                    id="Latitude"
                    onChange={handleChange}
                    className="formField peer"
                    autoComplete="true"
                    placeholder=" "
                />
                <Label
                    htmlFor="Latitude"
                    className={`pointer-events-none absolute text-xs duration-300 transition-all bg-background transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 
                    peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-blue-600 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1`}
                >
                    Latitude
                </Label>
            </fieldset>
            <fieldset className="relative">
                <Input
                    name="Longitude"
                    id="Longitude"
                    onChange={handleChange}
                    className="formField peer"
                    autoComplete="true"
                    placeholder=" "
                />
                <Label
                    htmlFor="Longitude"
                    className={`pointer-events-none absolute text-xs duration-300 transition-all bg-background transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 
                    peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-blue-600 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1`}
                >
                    Longitude
                </Label>
            </fieldset>
            <div className="flex justify-between flex-wrap-reverse">
                <Button onClick={() => ProcessData({ type: "location" })}>Generate QR Code</Button>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger className="text-xs text-muted-foreground hover:underline">
                            How to find your geo location?
                        </TooltipTrigger>
                        <TooltipContent>
                            <ul className="space-y-2">
                                <li>
                                    - <span className="font-semibold">Smartphone GPS:</span> Open
                                    your phone&apos;s Compass (iPhone) or Google Maps (Android) to
                                    see coordinates.
                                </li>
                                <li>
                                    - <span className="font-semibold">Google Maps:</span>{" "}
                                    Right-click anywhere on the map and select &quot;What&apos;s
                                    here?&quot; to get latitude/longitude.
                                </li>
                                <li>
                                    - <span className="font-semibold">Online Tools:</span> Websites
                                    like{" "}
                                    <span className="font-semibold underline">LatLong.net</span> and{" "}
                                    <span className="font-semibold underline">
                                        GPS-Coordinates.net
                                    </span>{" "}
                                    can pinpoint locations.
                                </li>
                            </ul>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
    );
}
