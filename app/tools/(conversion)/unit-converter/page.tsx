"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UnitsConverter from "@/app/tools/(conversion)/unit-converter/UnitsConverter";
import CurrencyConverter from "@/app/tools/(conversion)/unit-converter/CurrencyConverter";

export default function UnitConverter() {
    return (
        <section className="padding w-full max-w-2xl mx-auto space-y-5 text-accent-foreground">
            <h2>Choose unit type</h2>
            <Tabs defaultValue="measurements" className="relative flex flex-col space-y-10">
                <TabsList className="relative h-10 justify-start gap-2 bg-background/10">
                    <TabsTrigger
                        value="measurements"
                        className="relative z-10 w-full h-8 bg-foreground/5 data-[state=active]:bg-foreground data-[state=active]:text-background"
                    >
                        Measurements
                    </TabsTrigger>
                    <span>|</span>
                    <TabsTrigger
                        value="currency"
                        className="relative z-10 w-full h-8 bg-foreground/5 data-[state=active]:bg-foreground data-[state=active]:text-background"
                    >
                        Currency
                    </TabsTrigger>
                </TabsList>
                <UnitsConverter />
                <CurrencyConverter />
            </Tabs>
        </section>
    );
}
