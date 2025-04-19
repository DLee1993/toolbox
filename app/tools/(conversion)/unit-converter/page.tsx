"use client";

import { useState } from "react";
import { Unit } from "convert-units";
import { ConvertUnits } from "@/lib/unit-conversion/convertUnits";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SelectUnit } from "@/components/unit-converter/SelectUnit";
import { CircleAlert, CircleX } from "lucide-react";

export default function UnitConverter() {
    const [amount, setAmount] = useState("");
    const [selectedValue, setSelectedValue] = useState<{ from: Unit | ""; to: Unit | "" }>({
        from: "",
        to: "",
    });
    const [result, setResult] = useState<number | null>(null);
    const [error, setError] = useState<string>("");

    const ClearUnits = () => {
        setSelectedValue({ from: "", to: "" });
        setAmount("");
        setResult(null);
        setError("");
    };

    return (
        <section className="flex flex-col py-10">
            <article className="space-y-3">
                <h1 className="text-2xl md:text-3xl font-semibold">Unit converter.</h1>
                <p className="max-w-lg w-11/12">
                    This free conversion calculator converts between common units of measurement.
                </p>
            </article>
            <section className="my-10 space-y-5">
                <div className="flex flex-col gap-2">
                    <h2 className="text-sm font-semibold text-muted-foreground">From</h2>
                    <div className="flex gap-2">
                        <SelectUnit
                            type="from"
                            selectedValue={selectedValue}
                            setSelectedValue={setSelectedValue}
                        />
                        <Input
                            value={amount}
                            id="amount"
                            onChange={(e) => setAmount(e.target.value)}
                            className="max-w-52 sm:text-center"
                            placeholder="Amount"
                            type="number"
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <h2 className="text-sm font-semibold text-muted-foreground">To</h2>
                    <div className="flex gap-2">
                        <SelectUnit
                            type="to"
                            selectedValue={selectedValue}
                            setSelectedValue={setSelectedValue}
                        />
                        <Input
                            readOnly
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
                        ConvertUnits({
                            amount,
                            from: selectedValue.from,
                            to: selectedValue.to,
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
