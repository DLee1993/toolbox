"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Password from "@/components/credentials-generator/Password";
import Pin from "@/components/credentials-generator/Pin";

export default function CredentialsGenerator() {
    return (
        <section className="flex justify-between items-start gap-10 p-5 flex-wrap">
            <article className="flex-1 min-w-96 space-y-5">
                <h1 className="font-medium text-3xl sm:text-4xl">Strong. Secure. Fast.</h1>
                <p className="text-sm">
                    Generate secure credentials in seconds — choose between strong passwords and
                    numeric PINs. Passwords use a full mix of letters, numbers, and special
                    characters for maximum strength. PINs are short, digit-only codes ideal for
                    simpler authentication.
                </p>
                <p className="text-sm font-semibold">
                    All generation happens locally, and no data is stored.
                </p>
            </article>
            <section className="flex-1 min-w-96 bg-foreground text-background p-5 rounded-2xl space-y-5">
                <h2>Choose password type</h2>
                <Tabs defaultValue="password" className="relative flex flex-col space-y-10">
                    <TabsList className="relative h-10 justify-start gap-2 bg-background/10">
                        <TabsTrigger value="password" className="relative z-10 w-full h-8">
                            Password
                        </TabsTrigger>
                        <span>|</span>
                        <TabsTrigger value="code" className="relative z-10 h-8 w-full">
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
