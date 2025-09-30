"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UnitsConverter from "@/app/tools/(conversion)/unit-converter/UnitsConverter";
import CurrencyConverter from "@/app/tools/(conversion)/unit-converter/CurrencyConverter";

export default function UnitConverter() {
    
    return (
        <section className="flex justify-between items-start gap-10 flex-wrap">
            <article className="flex-1 min-w-96 space-y-10">
                <div className="space-y-2.5">
                    <h1 className="font-medium text-3xl sm:text-4xl">Strong. Secure. Fast.</h1>
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
            <section className="flex-1 min-w-96 rounded-2xl space-y-5">
                <h2>Choose unit type</h2>
                <Tabs defaultValue="measurements" className="relative flex flex-col space-y-10">
                    <TabsList className="relative h-10 justify-start gap-2 bg-background/10">
                        <TabsTrigger
                            value="measurements"
                            className="relative z-10 w-full h-8 data-[state=active]:bg-foreground data-[state=active]:text-background"
                        >
                            Measurements
                        </TabsTrigger>
                        <span>|</span>
                        <TabsTrigger
                            value="currency"
                            className="relative z-10 w-full h-8 data-[state=active]:bg-foreground data-[state=active]:text-background"
                        >
                            Currency
                        </TabsTrigger>
                    </TabsList>
                    <UnitsConverter />
                    <CurrencyConverter />
                </Tabs>
            </section>
        </section>
    );
}
