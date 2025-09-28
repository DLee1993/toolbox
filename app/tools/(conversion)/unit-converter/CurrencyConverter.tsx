"use client";

import { useEffect, useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { SelectCurrency } from "@/components/unit-converter/SelectCurrency";
import { ConvertCurrency } from "@/lib/currency-converter/convert";

interface CurrencyConverterProps {
    initialRates: { [key: string]: number };
}

export default function CurrencyConverter({ initialRates }: CurrencyConverterProps) {
    const [amount, setAmount] = useState("1");
    const [countryCodes, setCountryCodes] = useState<{ [key: string]: number }>(initialRates || {});
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
            rates: countryCodes,
            setResult,
            setError,
        });
    }, [amount, selectedValue.to, countryCodes, setResult, setError]);

    useEffect(() => {
        if (initialRates) {
            setCountryCodes(initialRates);
        }
        SubmitConversion();
    }, [initialRates, SubmitConversion]);

    return (
        <>
            <section className="px-2">
                <section className="flex justify-center items-center min-h-40 gap-5">
                    <section className="w-fit space-y-2">
                        <h2 className="text-sm font-semibold text-muted-foreground">From</h2>
                        <div className="flex gap-2 flex-wrap">
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
                                    SubmitConversion();
                                }}
                                placeholder="Enter currency amount"
                                type="text"
                            />
                        </div>
                    </section>
                    <section className="w-fit space-y-2">
                        <h2 className="text-sm font-semibold text-muted-foreground">To</h2>
                        <div className="flex gap-2 flex-wrap">
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
                    </section>
                </section>
            </section>
            <p className="text-sm w-full text-muted-foreground mt-2 absolute bottom-1 left-0 px-1 text-center sm:text-right">
                Powered by -{" "}
                <a href="https://www.exchangerate-api.com">Rates By Exchange Rate API</a>
            </p>
        </>
    );
}