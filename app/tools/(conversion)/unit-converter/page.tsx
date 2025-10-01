"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UnitsConverter from "@/app/tools/(conversion)/unit-converter/UnitsConverter";
import CurrencyConverter from "@/app/tools/(conversion)/unit-converter/CurrencyConverter";

export default function UnitConverter() {
    return (
        <section className="flex justify-between items-start gap-10 flex-wrap">
            <article className="flex-1 min-w-96 space-y-10 text-sm">
                <div className="space-y-2.5">
                    <h1 className="font-semibold text-2xl">Convert Currency and Measurements.</h1>
                    <p className="w-11/12">
                        Convert Currency and Measurements with ease — switch between global
                        currencies, metric and imperial units.
                    </p>
                </div>
                <ul className="list-disc list-inside space-y-1">
                    <li>
                        Currency <span className="text-xs font-bold">(160+ currencies)</span>
                    </li>
                    <li>
                        Lengths <span className="text-xs font-bold">(Inches, centimeters, meters, feet, miles, and more)</span>
                    </li>
                    <li>
                        Weight <span className="text-xs font-bold">(Grams, kilograms, pounds, ounces)</span>
                    </li>
                    <li>
                        Temperature <span className="text-xs font-bold">(Celsius, Fahrenheit, Kelvin)</span>
                    </li>
                    <li>
                        Volume <span className="text-xs font-bold">(Litres, gallons, cups, millilitres)</span>
                    </li>
                </ul>
                <p className="font-semibold">
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
