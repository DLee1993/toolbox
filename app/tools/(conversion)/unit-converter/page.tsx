"use client";

import { useState } from "react";
import { Unit } from "convert-units";
import { ConvertUnits } from "@/lib/unit-conversion/convertUnits";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SelectUnit } from "@/components/unit-converter/SelectUnit";

export default function UnitConverter() {
    const [amount, setAmount] = useState("");
    const [selectedValue, setSelectedValue] = useState<{ from: Unit | ""; to: Unit | "" }>({
        from: "",
        to: "",
    });
    const [result, setResult] = useState<number>();
    const [error, setError] = useState<string>("");

    const ClearUnits = () => {
        setSelectedValue({ from: "", to: "" });
        setAmount("");
        setResult(0);
    };

    return (
        <section className="flex flex-col py-10 space-y-10">
            <article className="space-y-3">
                <h1 className="text-2xl md:text-3xl font-semibold">Unit converter.</h1>
                <p className="max-w-lg w-11/12">
                    This free conversion calculator converts between common units of measurement.
                </p>
            </article>
            <div className="flex gap-2">
                <SelectUnit
                    type="from"
                    selectedValue={selectedValue}
                    setSelectedValue={setSelectedValue}
                />
                <Input
                    value={amount}
                    type="number"
                    onChange={(e) => setAmount(e.target.value)}
                    className="max-w-52 sm:text-center"
                    placeholder="Amount"
                />
                <SelectUnit
                    type="to"
                    selectedValue={selectedValue}
                    setSelectedValue={setSelectedValue}
                />
            </div>
            <p className="min-h-6 w-full">
                {error
                    ? `${error}`
                    : result
                    ? `${Number(amount).toLocaleString()} ${
                          selectedValue.from
                      } is equal to ${result.toLocaleString()} ${selectedValue.to}`
                    : ""}
            </p>
            <div className="flex gap-5">
                <Button
                    size="lg"
                    variant="outline"
                    onClick={() => ClearUnits()}
                    disabled={!result}
                    className="disabled:hover:cursor-not-allowed"
                >
                    Reset
                </Button>
                <Button
                    size="lg"
                    onClick={() =>
                        ConvertUnits({
                            amount,
                            from: selectedValue.from,
                            to: selectedValue.to,
                            setResult,
                            setError,
                        })
                    }
                >
                    Convert
                </Button>
            </div>
        </section>
    );
}
