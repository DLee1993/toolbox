import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction, useState } from "react";
import { GenerateQrCode } from "@/lib/qr-code-generator/generateQR";
import { Button } from "@/components/ui/button";

export default function URL({ setValue }: { setValue: Dispatch<SetStateAction<string>> }) {
    const [url, setUrl] = useState("");

    function ProcessData({ type }: { type: string }) {
        const qrValue = GenerateQrCode({ value: { url }, type });

        setValue(qrValue as string);
    }

    return (
        <div className="space-y-5">
            <Input
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Add a link to websites, social media profiles and even external pdf's"
                className="placeholder-shown:text-xs"
            />
            <Button onClick={() => ProcessData({ type: "url" })} disabled={!url}>
                Generate QR Code
            </Button>
        </div>
    );
}
