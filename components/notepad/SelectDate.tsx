import { useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default function SelectDate({
    HandleInputChange,
    defaultValue,
}: {
    defaultValue?: Date | undefined;
    HandleInputChange: (e: {
        target: {
            name: string;
            value: string;
        };
    }) => void;
}) {
    const [open, setOpen] = useState(false);
    const formattedDate = defaultValue ? new Date(defaultValue).toLocaleDateString() : "";

    return (
        <fieldset className="space-y-5">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" id="date" className="w-full min-h-12 justify-between">
                        {defaultValue ? (
                            formattedDate
                        ) : (
                            <p>
                                Select a date <span className="text-xs ">(optional)</span>
                            </p>
                        )}
                        <ChevronDownIcon />
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    className="w-auto overflow-hidden p-0 pointer-events-none"
                    align="start"
                >
                    <Calendar
                        mode="single"
                        selected={defaultValue}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                            setOpen(false);
                            HandleInputChange({
                                target: {
                                    name: "completedBy",
                                    value: date ? date.toISOString() : "",
                                },
                            });
                        }}
                        className="pointer-events-auto"
                    />
                </PopoverContent>
            </Popover>
        </fieldset>
    );
}
