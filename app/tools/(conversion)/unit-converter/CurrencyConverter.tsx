"use client";

import { useEffect, useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { SelectCurrency } from "@/components/unit-converter/SelectCurrency";
import { ConvertCurrency } from "@/lib/currency-converter/convert";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CircleAlert, CircleX } from "lucide-react";

export default function CurrencyConverter() {
    const [amount, setAmount] = useState("1");
    const [countryCodes, setCountryCodes] = useState<{ [key: string]: number }>({});
    const [result, setResult] = useState<number | null>(null);
    const [error, setError] = useState<string>("");
    const [selectedValue, setSelectedValue] = useState<{ from: string; to: string }>({
        from: "GBP",
        to: "USD",
    });

    const AddPunctuation = (value: string) => {
        const formattedValue = value.replace(/,/g, "");

        if (Number(formattedValue)) {
            setAmount(Number(formattedValue).toLocaleString());
        }
    };

    const SubmitConversion = useCallback(() => {
        setError("");
        ConvertCurrency({
            amount: amount,
            to: selectedValue.to,
            from: selectedValue.from,
            rates: countryCodes,
            setResult,
            setError,
        });
    }, [amount, selectedValue.to, selectedValue.from, countryCodes, setResult, setError]);

    useEffect(() => {
        async function fetchCurrency() {
            try {
                const exchangeRates = await fetch("https://open.er-api.com/v6/latest/GBP", {
                    method: "GET",
                });
                const data = await exchangeRates.json();

                setCountryCodes(data.rates);
            } catch (error) {
                console.log(error);
            }
        }

        fetchCurrency();
    }, []);

    const ClearUnits = () => {
        setSelectedValue({ from: "GBP", to: "USD" });
        setAmount("1");
        setResult(null);
        setError("");
    };

    return (
        <TabsContent value="currency">
             <section className="space-y-10">
                <div className="flex flex-col gap-2">
                    <h2 className="text-sm font-semibold text-muted-foreground">From</h2>
                    <div className="flex gap-2">
                        <SelectCurrency
                            type="from"
                            selectedValue={selectedValue}
                            setSelectedValue={setSelectedValue}
                            countryCodes={countryCodes}
                        />
                        <Input
                            value={amount}
                            id="amount"
                            onChange={(e) => {
                                setAmount(e.target.value);
                                AddPunctuation(e.target.value);
                            }}
                            placeholder="Enter currency amount"
                            type="text"
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <h2 className="text-sm font-semibold text-muted-foreground">To</h2>
                    <div className="flex gap-2">
                        <SelectCurrency
                            type="to"
                            selectedValue={selectedValue}
                            setSelectedValue={setSelectedValue}
                            countryCodes={countryCodes}
                        />
                        <Input
                            readOnly
                            type="text"
                            id="result"
                            value={
                                result !== null
                                    ? Number(result).toLocaleString()
                                    : error
                                    ? error
                                    : ""
                            }
                            className={`${error ? "text-red-500 font-medium" : ""}`}
                        />
                    </div>
                </div>
                <p className="min-h-5 text-red-600 text-sm font-medium">
                    {error && (
                        <span className="flex items-center gap-2">
                            <CircleAlert size={15} />
                            {error}
                        </span>
                    )}
                </p>
            </section>
            <div className="flex gap-5">
                <Button
                    variant="secondary"
                    className="cursor-pointer text-sm"
                    onClick={() => ClearUnits()}
                    disabled={!selectedValue.from}
                >
                    Reset
                    <CircleX />
                </Button>
                <Button
                    onClick={() => {
                        SubmitConversion();
                    }}
                >
                    Convert
                </Button>
            </div>
            <p className="text-xs text-muted-foreground absolute -bottom-8 right-0">
                Powered by -{" "}
                <a href="https://www.exchangerate-api.com">Rates By Exchange Rate API</a>
            </p>
        </TabsContent>
    );
}
