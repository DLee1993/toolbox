"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Dispatch, SetStateAction } from "react";

type Props = {
    alarm: boolean;
    sound: boolean;
    short: string;
    setShort: Dispatch<SetStateAction<string>>;
    medium: string;
    setMedium: Dispatch<SetStateAction<string>>;
    long: string;
    setLong: Dispatch<SetStateAction<string>>;
    toggleAlarm: () => void;
    toggleSound: () => void;
    updateSessionTime: (
        key: string,
        value: string,
        setter: Dispatch<SetStateAction<string>>
    ) => void;
    calculateTime: (newTime: number) => void;
    handleBreakTimeClick: (time: number) => void;
    breakTime: number;
    time: number;
};

export default function Options({
    short,
    setShort,
    medium,
    setMedium,
    long,
    setLong,
    updateSessionTime,
    alarm,
    toggleAlarm,
    sound,
    toggleSound,
    calculateTime,
    handleBreakTimeClick,
    breakTime,
    time,
}: Props) {
    const presets = [
        { label: "10 minutes", value: 10 },
        { label: "15 minutes", value: 15 },
        { label: "20 minutes", value: 20 },
        { label: "25 minutes", value: 25 },
        { label: "30 minutes", value: 30 },
        { label: "60 minutes", value: 60 },
    ];

    const optionsContent = (
        <section className="space-y-10">
            <div className="space-y-5">
                <p className="text-sm">Customise session times</p>
                <section className="w-full flex gap-2">
                    <div className="w-1/3 space-y-1">
                        <p className="text-xs">Short</p>
                        <Input
                            type="number"
                            value={short}
                            onChange={(e) => updateSessionTime("short", e.target.value, setShort)}
                            placeholder="1-5 mins"
                            min={1}
                        />
                    </div>
                    <div className="w-1/3 space-y-1">
                        <p className="text-xs">Medium</p>
                        <Input
                            type="number"
                            value={medium}
                            onChange={(e) => updateSessionTime("medium", e.target.value, setMedium)}
                            placeholder="5-30 mins"
                            min={1}
                        />
                    </div>
                    <div className="w-1/3 space-y-1">
                        <p className="text-xs">Long</p>
                        <Input
                            type="number"
                            value={long}
                            onChange={(e) => updateSessionTime("long", e.target.value, setLong)}
                            placeholder="30-90 mins"
                            min={1}
                        />
                    </div>
                </section>
            </div>
            <div className="flex justify-between items-center gap-5">
                <div className="flex-1 flex justify-between items-center">
                    <p className="text-sm">Add an alarm</p>
                    <Checkbox onClick={toggleAlarm} defaultChecked={alarm} />
                </div>
                <div className="flex-1 flex justify-between items-center">
                    <p className="text-sm">Sound on</p>
                    <Checkbox onClick={toggleSound} defaultChecked={sound} />
                </div>
            </div>
            <div className="space-y-2.5">
                <p className="text-sm">Select a break duration</p>
                <ul className="grid grid-cols-3 gap-2">
                    {presets.map((preset) => (
                        <li key={preset.value}>
                            <Button
                                variant="outline"
                                className="border border-border w-full"
                                onClick={() => handleBreakTimeClick(preset.value)}
                                disabled={breakTime / 60 === preset.value}
                            >
                                {preset.label}
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );

    const SessionButtons = (
        <section className="space-y-2.5">
            <p className="text-sm text-left">Select session length</p>
            <div className="w-full flex justify-between items-center gap-2 border-b border-border">
                <Button
                    className="w-1/3"
                    onClick={() => calculateTime(parseInt(short))}
                    disabled={time / 60 === Number(short) ? true : false}
                >
                    Short
                </Button>
                <Button
                    className="w-1/3"
                    onClick={() => calculateTime(parseInt(medium))}
                    disabled={time / 60 === Number(medium) ? true : false}
                >
                    Medium
                </Button>
                <Button
                    className="w-1/3"
                    onClick={() => calculateTime(parseInt(long))}
                    disabled={time / 60 === Number(long) ? true : false}
                >
                    Long
                </Button>
            </div>
        </section>
    );

    return (
        <Card className="w-full max-w-md min-w-80">
            <CardHeader aria-label="focus timer settings" className="border-b border-border">
                {SessionButtons}
            </CardHeader>
            <CardContent className="py-4">{optionsContent}</CardContent>
        </Card>
    );
}
