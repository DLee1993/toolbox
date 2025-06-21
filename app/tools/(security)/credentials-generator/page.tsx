"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Password from "@/components/credentials-generator/Password";
import Pin from "@/components/credentials-generator/Pin";

export default function CredentialsGenerator() {
    return (
        <section>
            <section className="p-5">
                <Tabs defaultValue="password" className="relative">
                    <TabsList className="h-10 justify-start bg-transparent gap-5">
                        <TabsTrigger
                            value="password"
                            className="rounded-none bg-background w-full md:w-auto h-full px-0 data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary"
                        >
                            Password
                        </TabsTrigger>
                        <TabsTrigger
                            value="code"
                            className="rounded-none bg-background w-full md:w-auto h-full px-0 data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary"
                        >
                            Pin Code
                        </TabsTrigger>
                    </TabsList>
                    <Password />
                    <Pin />
                </Tabs>
            </section>
        </section>
    );
}
