"use client";

// import React, { useState, useEffect } from "react";

import Timer from "@/components/focus-timer/timer";
import Options from "@/components/focus-timer/options";
import Alarm from "@/components/focus-timer/alarm";

export default function FocusTimer() {
    // const [isOpen, setIsOpen] = useState(false);
    // const [time, setTime] = useState(300);
    // const [remainingTime, setRemainingTime] = useState(time);
    // const [isRunning, setIsRunning] = useState(false);
    // const [isFinished, setIsFinished] = useState(false);
    // const [shortBreak, setShortBreak] = useState("");
    // const [mediumBreak, setMediumBreak] = useState("");
    // const [longBreak, setLongBreak] = useState("");

    // useEffect(() => {
    //     setShortBreak(getStoredOrDefault("short", "1"));
    //     setMediumBreak(getStoredOrDefault("medium", "5"));
    //     setLongBreak(getStoredOrDefault("long", "30"));
    // }, []);

    // useEffect(() => {
    //     let timer: string | number | NodeJS.Timeout | undefined;

    //     if (isRunning) {
    //         timer = setInterval(() => {
    //             setRemainingTime((prevTime) => {
    //                 if (prevTime <= 1) {
    //                     clearInterval(timer);
    //                     return 0;
    //                 }
    //                 return prevTime - 1;
    //             });
    //         }, 1000);
    //     }
    //     return () => clearInterval(timer); // Cleanup on component unmount or when paused
    // }, [isRunning]);

    // useEffect(() => {
    //     if (remainingTime === 0 && isRunning) {
    //         setTimeout(() => {
    //             setIsRunning(false); // Pause the timer
    //             // Example: Restart with initial time
    //             setRemainingTime(time);
    //             setIsFinished(true); // Set finished state

    //             setTimeout(() => {
    //                 setIsFinished(false); // Reset finished state after 5 seconds
    //             }, 5500);
    //             // You can also add a sound notification here
    //         }, 1000);
    //     }
    // }, [remainingTime, isRunning, time]);

    // const getStoredOrDefault = (key: string, fallback: string) =>
    //     localStorage.getItem(key) || fallback;

    // const startTimer = () => {
    //     setIsRunning(true);
    //     setIsFinished(false); // Reset finished state when starting
    // };

    // const pauseTimer = () => {
    //     setIsRunning(false);
    // };

    // const resetTimer = () => {
    //     setRemainingTime(time);
    //     setIsRunning(false);
    // };

    // const calculateTime = (newTime: number, isPreset = false) => {
    //     if (!isPreset) {
    //         setIsRunning(false);
    //         setTime(newTime);
    //         setRemainingTime(newTime);
    //     } else {
    //         setIsRunning(false);
    //         setTime(newTime * 60);
    //         setRemainingTime(newTime * 60);
    //     }
    // };

    // const handlePresetClick = (newTime: number) => {
    //     if (!newTime) return;
    //     calculateTime(newTime, true);
    //     setIsOpen(false);
    // };

    // const handleBreakTimeChange = (e: React.ChangeEvent<HTMLInputElement>, breakName: string) => {
    //     const value = e.target.value;
    //     localStorage.setItem(breakName, value);

    //     if (breakName === "short") {
    //         setShortBreak(value);
    //     } else if (breakName === "medium") {
    //         setMediumBreak(value);
    //     } else {
    //         setLongBreak(value);
    //     }
    // };

    // const presets = [
    //     { label: "5 minutes", value: 5 },
    //     { label: "10 minutes", value: 10 },
    //     { label: "15 minutes", value: 15 },
    //     { label: "20 minutes", value: 20 },
    //     { label: "25 minutes", value: 25 },
    //     { label: "30 minutes", value: 30 },
    //     { label: "45 minutes", value: 45 },
    //     { label: "60 minutes", value: 60 },
    //     { label: "90 minutes", value: 90 },
    // ];

    return (
        <section className="padding height relative flex justify-center items-center gap-8">
            <Timer />
            <Options />
            <Alarm />
            {/* <div className="w-10/12 flex flex-col justify-center">
                <section className="w-full flex justify-between items-center gap-1 min-h-14 border-b border-border">
                    <Button
                        onClick={() => handlePresetClick(parseInt(shortBreak))}
                        size="sm"
                        className="w-1/3 rounded-sm"
                    >
                        Short
                    </Button>
                    <Button
                        onClick={() => handlePresetClick(parseInt(mediumBreak))}
                        size="sm"
                        className="w-1/3 rounded-sm"
                    >
                        Medium
                    </Button>
                    <Button
                        onClick={() => handlePresetClick(parseInt(longBreak))}
                        size="sm"
                        className="w-1/3 rounded-sm"
                    >
                        Long
                    </Button>
                </section>
                <div className="relative">
                    <div
                        id="progress-bar"
                        className="absolute z-10 top-0 left-0 h-full rounded-md transition-all duration-300"
                        style={{ width: `${(remainingTime / time) * 100}%` }}
                    ></div>

                    <div className="h-72 flex justify-center items-center rounded-md bg-secondary">
                        <p className="relative z-10 text-9xl md:text-[150px] w-full text-center font-medium font-mono">
                            {Math.floor(remainingTime / 60)
                                .toString()
                                .padStart(2, "0")}
                            :{(remainingTime % 60).toString().padStart(2, "0")}
                        </p>
                        <p className="relative z-10 min-h-6">
                            {isFinished && (
                                <span className="flex items-center gap-2 text-sm">
                                    Time&apos;s up!
                                    <BellRing size={15} className="animate-wiggle" />
                                </span>
                            )}
                        </p>
                    </div>
                </div>
                <section className="w-full flex justify-between items-center min-h-14 border-t border-border gap-1">
                    <Button
                        onClick={startTimer}
                        disabled={isRunning}
                        size="sm"
                        className="w-1/4 rounded-sm"
                    >
                        <span>Start</span>
                        <Play size={15} />
                    </Button>
                    <Button
                        onClick={pauseTimer}
                        disabled={!isRunning}
                        size="sm"
                        className="w-1/4 rounded-sm"
                    >
                        <span>Pause</span>
                        <Pause size={15} />
                    </Button>
                    <Button onClick={resetTimer} size="sm" className="w-1/4 rounded-sm">
                        <span>Restart</span>
                        <RotateCcw size={15} />
                    </Button>
                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogTrigger asChild>
                            <Button size="sm" className="w-1/4 rounded-sm">
                                <span>Settings</span>
                                <Settings2 className="!size-4" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Settings</DialogTitle>
                                <DialogDescription className="sr-only">
                                    Make changes to the timer settings here.
                                </DialogDescription>
                            </DialogHeader>
                            <section className="border-b border-border/50 space-y-2.5 py-5">
                                <p className="text-sm font-semibold">Shortcuts</p>
                                <section className=" grid grid-cols-3 gap-2">
                                    <div>
                                        <p className="text-xs">Short Break</p>
                                        <Input
                                            type="number"
                                            onChange={(e) => handleBreakTimeChange(e, "short")}
                                            defaultValue={shortBreak}
                                            placeholder="Add time in minutes"
                                            min={1}
                                            max={5}
                                        />
                                    </div>
                                    <div>
                                        <p className="text-xs">Medium Break</p>
                                        <Input
                                            type="number"
                                            onChange={(e) => handleBreakTimeChange(e, "medium")}
                                            defaultValue={mediumBreak}
                                            placeholder="Add time in minutes"
                                            min={5}
                                            max={30}
                                        />
                                    </div>
                                    <div>
                                        <p className="text-xs">Long Break</p>
                                        <Input
                                            type="number"
                                            onChange={(e) => handleBreakTimeChange(e, "long")}
                                            defaultValue={longBreak}
                                            placeholder="Add time in minutes"
                                            min={30}
                                            max={90}
                                        />
                                    </div>
                                </section>
                            </section>
                            <section className="space-y-2.5">
                                <p className="text-sm font-semibold">Presets</p>
                                <ul className="grid grid-cols-3 gap-2">
                                    {presets.map((preset) => (
                                        <li key={preset.value}>
                                            <Button
                                                variant="outline"
                                                className="border border-border w-full"
                                                onClick={() => handlePresetClick(preset.value)}
                                                disabled={time / 60 === preset.value}
                                            >
                                                {preset.label}
                                            </Button>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                            <DialogFooter>
                                <Button type="button" onClick={() => setIsOpen(false)}>
                                    close
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </section>
            </div> */}
        </section>
    );
}
