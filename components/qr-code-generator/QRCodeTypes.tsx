import { Dispatch, SetStateAction } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import URL from "@/components/qr-code-generator/forms/url";
import EMAIL from "@/components/qr-code-generator/forms/email";
import SMS from "@/components/qr-code-generator/forms/sms";
import WIFI from "@/components/qr-code-generator/forms/wifi";
import PLAINTEXT from "@/components/qr-code-generator/forms/plainText";
import LOCATION from "@/components/qr-code-generator/forms/location";

export default function QRCodeTypes({ setValue }: { setValue: Dispatch<SetStateAction<string>> }) {
    const types = ["URL", "EMAIL", "SMS", "TEXT", "WIFI", "LOCATION"];

    return (
        <TabsContent value="Type">
            <Tabs defaultValue="url" className="py-5">
                <TabsList className="w-full h-fit flex flex-wrap gap-2 justify-start bg-transparent">
                    {types.map((type, i) => (
                        <TabsTrigger
                            key={i}
                            value={type.toLowerCase()}
                            className="h-10 w-20 text-xs data-[state=active]:bg-muted"
                        >
                            {type}
                        </TabsTrigger>
                    ))}
                </TabsList>
                {types.map((type, i) => (
                    <TabsContent key={i} value={type.toLowerCase()} className="py-10">
                        {/* RUN A CHECK TO RENDER EACH FORM BASED ON TYPE, ALSO PASS ON THE SET VALUE FUNCTION */}
                        {type === "URL" ? <URL setValue={setValue} /> : null}
                        {type === "EMAIL" ? <EMAIL setValue={setValue} /> : null}
                        {type === "SMS" ? <SMS setValue={setValue} /> : null}
                        {type === "TEXT" ? <PLAINTEXT setValue={setValue} /> : null}
                        {type === "WIFI" ? <WIFI setValue={setValue} /> : null}
                        {type === "LOCATION" ? <LOCATION setValue={setValue} /> : null}
                    </TabsContent>
                ))}
            </Tabs>
        </TabsContent>
    );
}
