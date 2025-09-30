"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Password from "@/components/credentials-generator/Password";
import Pin from "@/components/credentials-generator/Pin";

export default function CredentialsGenerator() {
    return (
        <section className="height flex justify-between items-start gap-10 flex-wrap">
            <article className="flex-1 space-y-10">
                <div className="space-y-2.5">
                    <h1 className="font-semibold text-2xl">Strong. Secure. Fast.</h1>
                    <p className="text-sm">
                        Generate secure credentials in seconds — choose between strong passwords and
                        numeric PINs. PINs are short, digit-only codes ideal for simpler
                        authentication. Our passwords are complex, combining:
                    </p>
                </div>
                <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>
                        Letters <span>(A-Z, a-z)</span>
                    </li>
                    <li>
                        Numbers <span>(0-9)</span>
                    </li>
                    <li>
                        Special Characters <span>(@, #, $, %, &, *)</span>
                    </li>
                </ul>

                <p className="text-sm font-semibold">
                    All generation happens locally, and no data is stored.
                </p>
            </article>
            <section className="flex-1 rounded-2xl space-y-5">
                <h2>Choose password type</h2>
                <Tabs defaultValue="password" className="relative flex flex-col space-y-10">
                    <TabsList className="relative h-10 justify-start gap-2 bg-background/10">
                        <TabsTrigger
                            value="password"
                            className="relative z-10 w-full h-8 data-[state=active]:bg-foreground data-[state=active]:text-background"
                        >
                            Password
                        </TabsTrigger>
                        <span>|</span>
                        <TabsTrigger
                            value="code"
                            className="relative z-10 w-full h-8 data-[state=active]:bg-foreground data-[state=active]:text-background"
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
