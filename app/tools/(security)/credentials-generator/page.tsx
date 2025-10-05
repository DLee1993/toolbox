"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Password from "@/components/credentials-generator/Password";
import Pin from "@/components/credentials-generator/Pin";

export default function CredentialsGenerator() {
    return (
        <section className="padding flex justify-between items-start flex-wrap gap-10">
            <article className="flex-1 min-w-80 sm:min-w-96 space-y-10">
                <div className="space-y-2.5">
                    <h1 className="font-semibold text-3xl">Strong. Secure. Fast.</h1>
                    <p className="w-11/12">
                        Generate secure credentials in seconds — choose between strong passwords and
                        numeric PINs. PINs are short, digit-only codes ideal for simpler
                        authentication. Our passwords are complex, combining:
                    </p>
                </div>
                <ul className="list-disc list-inside space-y-1">
                    <li>
                        Letters <span className="text-xs font-bold">(A-Z, a-z)</span>
                    </li>
                    <li>
                        Numbers <span className="text-xs font-bold">(0-9)</span>
                    </li>
                    <li>
                        Special Characters <span className="text-xs font-bold">(@, #, $, %, &, *)</span>
                    </li>
                </ul>

                <p className="font-semibold">
                    All generation happens locally, and no data is stored.
                </p>
            </article>
            <div className="w-full h-[1px] bg-border lg:hidden"></div>
            <section className="flex-1 min-w-80 sm:min-w-96 rounded-xl space-y-5 text-accent-foreground">
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
