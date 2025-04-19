"use client";

import * as React from "react";
import { MeasurementTypes } from "@/lib/unit-conversion/convertUnits";
import { Unit } from "convert-units";

import { useMediaQuery } from "@/lib/global/use-media-query";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";

type Props = {
    type: "from" | "to";
    selectedValue: {
        from: Unit | "";
        to: Unit | "";
    };
    setSelectedValue: React.Dispatch<
        React.SetStateAction<{
            from: Unit | "";
            to: Unit | "";
        }>
    >;
};

export function SelectUnit({ type, selectedValue, setSelectedValue }: Props) {
    const [open, setOpen] = React.useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    if (isDesktop) {
        return (
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className="w-[150px] flex justify-between items-center"
                    >
                        {selectedValue[type] ? selectedValue[type] : `Select unit`}
                        <ChevronDown className={`${open ? "rotate-180" : "rotate-0"}`} />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] h-60 p-0" align="start">
                    <UnitList setOpen={setOpen} setSelectedUnit={setSelectedValue} type={type} />
                </PopoverContent>
            </Popover>
        );
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button variant="outline" className="w-[150px] justify-start">
                    {selectedValue[type] ? selectedValue[type] : `Convert ${type}`}
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mt-4 border-t">
                    <DrawerHeader>
                        <DrawerTitle>Select a unit</DrawerTitle>
                        <DrawerDescription>Choose the unit you want to use.</DrawerDescription>
                    </DrawerHeader>
                    <UnitList setOpen={setOpen} setSelectedUnit={setSelectedValue} type={type} />
                </div>
            </DrawerContent>
        </Drawer>
    );
}

function UnitList({
    setOpen,
    setSelectedUnit,
    type,
}: {
    setOpen: (open: boolean) => void;
    setSelectedUnit: React.Dispatch<React.SetStateAction<{ from: Unit | ""; to: Unit | "" }>>;
    type: string;
}) {
    return (
        <Command>
            <CommandInput placeholder="Filter units..." autoFocus/>
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                {MeasurementTypes.map((mType) => (
                    <CommandGroup key={mType.measurement}>
                        <h4 className="text-sm font-semibold p-2 capitalize bg-muted/50">
                            {mType.measurement}
                        </h4>
                        {mType.units.map((unit, i) => (
                            <CommandItem
                                key={i}
                                className="cursor-pointer ml-1"
                                value={unit}
                                onSelect={(value) => {
                                    setSelectedUnit((prev) => ({ ...prev, [type]: value }));
                                    setOpen(false);
                                }}
                            >
                                {unit}
                            </CommandItem>
                        ))}
                        {/* <CommandSeparator /> */}
                    </CommandGroup>
                ))}
            </CommandList>
        </Command>
    );
}
