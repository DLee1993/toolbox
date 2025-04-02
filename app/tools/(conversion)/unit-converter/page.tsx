"use client";

import { useState } from "react";
import { Unit } from "convert-units";
import { ConvertUnits, MeasurementTypes } from "@/hooks/unit-conversion/convertUnits";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function UnitConverter() {
    const [amount, setAmount] = useState("");
    const [selectedValue, setSelectedValue] = useState<{ from: Unit | ""; to: Unit | "" }>({
        from: "",
        to: "",
    });
    const [result, setResult] = useState<number>();
    const [error, setError] = useState<string>("");

    const SelectComponent = ({ type }: { type: "from" | "to" }) => {
        return (
            <Select
                value={selectedValue[type]}
                onValueChange={(value) => setSelectedValue({ ...selectedValue, [type]: value })}
            >
                <SelectTrigger className="flex-1 min-w-40">
                    <SelectValue placeholder={`Convert ${type}`} />
                </SelectTrigger>
                <SelectContent className="max-h-52">
                    {/* select group for each measurement */}
                    {MeasurementTypes.map((type) => (
                        <SelectGroup key={type.measurement}>
                            <SelectLabel className="p-2 border-y-2 border-muted capitalize">
                                {type.measurement}
                            </SelectLabel>

                            {type.units.map((unit, i) => (
                                <SelectItem key={i} value={unit} className="cursor-pointer">
                                    {unit}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    ))}
                </SelectContent>
            </Select>
        );
    };

    const ClearUnits = () => {
        setSelectedValue({ from: "", to: "" });
        setAmount("");
        setResult(0);
    };

    return (
        <section className="flex flex-col justify-center h-full py-5 items-center gap-5 md:gap-10">
            <article className="space-y-3 mx-auto text-center">
                <h1 className="text-2xl md:text-3xl font-semibold">Unit converter.</h1>
                <p className="max-w-lg w-11/12 mx-auto">
                    This free conversion calculator converts between common units of length,
                    temperature, area, volume, weight, time and more.
                </p>
            </article>
            <div className="flex flex-col sm:flex-row items-center gap-2 mt-10">
                <SelectComponent type="from" />

                <Input
                    value={amount}
                    type="number"
                    onChange={(e) => setAmount(e.target.value)}
                    className="sm:text-center flex-1"
                    placeholder="100"
                />

                <SelectComponent type="to" />
            </div>
            <p className="min-h-6 w-full text-center">
                {error
                    ? `${error}`
                    : result
                    ? `${amount} ${selectedValue.from} is equal to ${result} ${selectedValue.to}`
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
