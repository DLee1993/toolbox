"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft, CircleAlert, CircleX } from "lucide-react";
import { SelectCurrency } from "@/components/currency-converter/SelectCurrency";
import { ConvertCurrency } from "@/lib/currency-converter/convert";

export default function CurrencyConverter() {
    const [amount, setAmount] = useState("1");
    const [countryCodes, setCountryCodes] = useState<{ [key: string]: number }>({});
    const [result, setResult] = useState<number | null>(null);
    const [error, setError] = useState<string>("");
    const [selectedValue, setSelectedValue] = useState<{ from: string; to: string }>({
        from: "GBP",
        to: "",
    });

    const ClearUnits = () => {
        setSelectedValue({ from: "", to: "" });
        setAmount("");
        setResult(null);
        setError("");
    };

    const AddPunctuation = (value: string) => {
        const formattedValue = value.replace(/,/g, "");

        if (Number(formattedValue)) {
            setAmount(Number(formattedValue).toLocaleString());
        }
    };

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

    return (
        <section className="height flex flex-col justify-between items-start space-y-5 md:space-y-10 py-5 md:py-10">
            <article className="space-y-3">
                <h1 className="text-2xl md:text-3xl font-semibold">Currency converter.</h1>
                <p className="max-w-lg w-11/12">
                    This free conversion calculator converts between global currencies.
                </p>
                <p className="text-[10px] text-muted-foreground mt-2">
                    Powered by -{" "}
                    <a href="https://www.exchangerate-api.com">Rates By Exchange Rate API</a>
                </p>
            </article>
            <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5 md:gap-10 max-w-6xl">
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
                            className="max-w-52 sm:text-center"
                            placeholder="Amount"
                            type="text"
                        />
                    </div>
                </div>
                <ArrowRightLeft size={16} className="mt-5" />
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
                            value={result !== null ? Number(result).toLocaleString() : ""}
                            className="max-w-52 sm:text-center"
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
                        ConvertCurrency({
                            amount: amount,
                            to: selectedValue.to,
                            rates: countryCodes,
                            setResult,
                            setError,
                        });
                    }}
                >
                    Convert
                </Button>
            </div>
        </section>
    );
}
