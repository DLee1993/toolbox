import { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// - call the GenerateQrCode when user submits data
//! - Make sure all objects have a type key, this key will determine how the function proccesses the data
// - use async await for error handling
// - function will return a string
// - pass the string to setValue
// - this will set the value in the root page and be passed to the library to generate the qr code
// - set value prop is to return the full string

export default function QRCodeTypes({ setValue }: { setValue: Dispatch<SetStateAction<string>> }) {
    const types = ["URL", "VCARD", "EMAIL", "SMS", "WIFI", "IMAGE", "PROFILE", "PDF"];

    return (
        <TabsContent value="Type">
            <Tabs defaultValue={types[0].toLowerCase()} className="py-5">
                <TabsList className="w-full h-fit flex flex-wrap justify-start bg-transparent">
                    {types.map((type, i) => (
                        <TabsTrigger
                            key={i}
                            value={type.toLowerCase()}
                            className="h-10 w-20 data-[state=active]:bg-muted"
                        >
                            {type}
                        </TabsTrigger>
                    ))}
                </TabsList>
                {types.map((type, i) => (
                    <TabsContent key={i} value={type.toLowerCase()}>
                        {type}
                    </TabsContent>
                ))}
            </Tabs>
        </TabsContent>
    );
}
