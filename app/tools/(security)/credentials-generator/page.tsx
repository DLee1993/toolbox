"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Password from "@/components/credentials-generator/Password";
import Pin from "@/components/credentials-generator/Pin";

export default function CredentialsGenerator() {
    return (
            <section className="padding space-y-5 text-accent-foreground w-full max-w-2xl mx-auto">
                <h2>Choose password type</h2>
                <Tabs defaultValue="password" className="relative flex flex-col space-y-10">
                    <TabsList className="relative h-10 justify-start gap-2 bg-background/10">
                        <TabsTrigger
                            value="password"
                            className="relative z-10 w-full h-8 bg-foreground/5 data-[state=active]:bg-foreground data-[state=active]:text-background"
                        >
                            Password
                        </TabsTrigger>
                        <span>|</span>
                        <TabsTrigger
                            value="code"
                            className="relative z-10 w-full h-8 bg-foreground/5 data-[state=active]:bg-foreground data-[state=active]:text-background"
                        >
                            Pin Code
                        </TabsTrigger>
                    </TabsList>
                    <Password />
                    <Pin />
                </Tabs>
            </section>
    );
}
