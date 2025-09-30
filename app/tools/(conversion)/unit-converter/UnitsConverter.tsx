import { useState } from "react";
import { Unit } from "convert-units";
import { ConvertUnits } from "@/lib/unit-conversion/convertUnits";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SelectUnit } from "@/components/unit-converter/SelectUnit";
import { CircleAlert, CircleX } from "lucide-react";
import { TabsContent } from "@/components/ui/tabs";

export default function UnitsConverter() {
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
        <TabsContent value="measurements">
            <section className="flex flex-col justify-between items-start h-60">
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
                            className="text-center"
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
                            className="text-center"
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
        </TabsContent>
    );
}
