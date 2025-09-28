"use client";

import * as React from "react";

import { useMediaQuery } from "@/lib/global/use-media-query";
import rateNames from '@/lib/currency-converter/rateNames.json';
import CurrencyFlag from 'react-currency-flags';
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
        from: string;
        to: string;
    };
    countryCodes: {
        [key: string]: number;
    };
    setSelectedValue: React.Dispatch<
        React.SetStateAction<{
            from: string;
            to: string;
        }>
    >;
};

export function SelectCurrency({ type, selectedValue, setSelectedValue, countryCodes }: Props) {
    const [open, setOpen] = React.useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    if (isDesktop) {
        return (
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className="flex justify-between items-center"
                    >
                        {selectedValue[type] ? (<><CurrencyFlag currency={selectedValue[type]} /> {selectedValue[type]}</>) : `Select currency`}
                        <ChevronDown className={`${open ? "rotate-180" : "rotate-0"}`} />
                    </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-80 p-1">
                    <CurrencyList
                        setOpen={setOpen}
                        setSelectedUnit={setSelectedValue}
                        type={type}
                        rates={countryCodes}
                    />
                </PopoverContent>
            </Popover>
        );
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button variant="outline" className="w-full">
                    {selectedValue[type] ? (<span className="flex justify-start items-center w-full gap-2"><CurrencyFlag currency={selectedValue[type]} /> {selectedValue[type]}</span>) : `Select currency`}
                </Button>
            </DrawerTrigger>
            <DrawerContent className="p-1">
                <div className="mt-4 border-t">
                    <DrawerHeader>
                        <DrawerTitle>Select a currency</DrawerTitle>
                        <DrawerDescription>Choose the currency you want to use.</DrawerDescription>
                    </DrawerHeader>
                    <CurrencyList
                        setOpen={setOpen}
                        setSelectedUnit={setSelectedValue}
                        type={type}
                        rates={countryCodes}
                    />
                </div>
            </DrawerContent>
        </Drawer>
    );
}

function CurrencyList({
    setOpen,
    setSelectedUnit,
    type,
    rates,
}: {
    setOpen: (open: boolean) => void;
    setSelectedUnit: React.Dispatch<React.SetStateAction<{ from: string; to: string }>>;
    type: string;
    rates: {
        [key: string]: number;
    };
}) {
    return (
        <Command className="">
            <CommandInput placeholder="Filter currencies..." autoFocus />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                {Object.keys(rates).flatMap((rate, i) => (
                    <CommandGroup key={rate}>
                        <CommandItem
                            key={i}
                            className="cursor-pointer ml-1"
                            value={rate}
                            onSelect={(value) => {
                                setSelectedUnit((prev) => ({ ...prev, [type]: value }));
                                setOpen(false);
                            }}
                        >
                            <CurrencyFlag currency={rate} /> {rate} ({rateNames[rate as keyof typeof rateNames]})
                        </CommandItem>
                    </CommandGroup>
                ))}
            </CommandList>
        </Command>
    );
}
