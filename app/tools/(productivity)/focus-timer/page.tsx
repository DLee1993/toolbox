"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { NotifyUser } from "@/lib/global/NotifyUser";
import { BellRing, Play, Pause, RotateCcw, Settings2 } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function FocusTimer() {
    const [isOpen, setIsOpen] = useState(false);
    const [time, setTime] = useState(300);
    const [remainingTime, setRemainingTime] = useState(time);
    const [isRunning, setIsRunning] = useState(false);
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        let timer: string | number | NodeJS.Timeout | undefined;

        if (isRunning) {
            timer = setInterval(() => {
                setRemainingTime((prevTime) => {
                    if (prevTime <= 1) {
                        clearInterval(timer);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer); // Cleanup on component unmount or when paused
    }, [isRunning]);

    useEffect(() => {
        if (remainingTime === 0 && isRunning) {
            setTimeout(() => {
                setIsRunning(false); // Pause the timer
                // Example: Restart with initial time
                setRemainingTime(time);
                NotifyUser({
                    message: time / 60 >= 60 ? "You should take a break." : "Don't lose focus.",
                    type: "Time's up",
                    duration: 5000,
                });
                setIsFinished(true); // Set finished state

                setTimeout(() => {
                    setIsFinished(false); // Reset finished state after 5 seconds
                }, 5500);
                // You can also add a sound notification here
            }, 1000);
        }
    }, [remainingTime, isRunning, time]);

    const startTimer = () => {
        setIsRunning(true);
        setIsFinished(false); // Reset finished state when starting
    };

    const pauseTimer = () => {
        setIsRunning(false);
    };

    const resetTimer = () => {
        setRemainingTime(time);
        setIsRunning(false);
    };

    const calculateArc = (percentage: number) => {
        const radius = 150;
        const circumference = 2 * Math.PI * radius;

        return circumference - (percentage / 100) * circumference;
    };

    const calculateTime = (newTime: number, isPreset = false) => {
        if (!isPreset) {
            setIsRunning(false);
            setTime(newTime);
            setRemainingTime(newTime);
        } else {
            setIsRunning(false);
            setTime(newTime * 60);
            setRemainingTime(newTime * 60);
        }
    };

    const timePercentage = (remainingTime / time) * 100;

    const handlePresetClick = (newTime: number) => {
        if (!newTime) return;
        calculateTime(newTime, true);
        setIsOpen(false);
    };

    const handleCustomTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (!value) return;
        const numericValue = parseInt(value);
        if (isNaN(numericValue)) return;
        const time = numericValue * 60;
        calculateTime(time);
    };

    const presets = [
        { label: "5 minutes", value: 5 },
        { label: "10 minutes", value: 10 },
        { label: "15 minutes", value: 15 },
        { label: "20 minutes", value: 20 },
        { label: "25 minutes", value: 25 },
        { label: "30 minutes", value: 30 },
        { label: "45 minutes", value: 45 },
        { label: "60 minutes", value: 60 },
        { label: "90 minutes", value: 90 },
        { label: "120 minutes", value: 120 },
    ];

    return (
        <section>
            <section className="flex flex-col items-center justify-center space-y-10">
                <div className="relative w-fit">
                    <svg width="350" height="350">
                        <circle
                            cx="175"
                            cy="175"
                            r="150"
                            stroke=""
                            strokeWidth="2"
                            fill="none"
                            className="stroke-muted"
                        />
                        <circle
                            cx="25"
                            cy="175"
                            r="150"
                            strokeWidth="2"
                            fill="none"
                            strokeDasharray="942"
                            strokeDashoffset={calculateArc(timePercentage)}
                            strokeLinecap="round"
                            transform="rotate(-90 100 100)"
                            style={{ transition: "stroke-dashoffset 1s ease" }}
                            className="stroke-foreground"
                        />
                    </svg>
                    <p className="flex flex-col justify-center items-center space-y-2.5 mt-2.5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <span className="text-6xl w-52 text-center font-robotoMono font-medium">
                            {Math.floor(remainingTime / 60)
                                .toString()
                                .padStart(2, "0")}
                            :{(remainingTime % 60).toString().padStart(2, "0")}
                        </span>
                        <span className="min-h-6">
                            {isFinished && (
                                <span className="flex items-center gap-2 text-sm">
                                    Time&apos;s up!
                                    <BellRing size={15} className="animate-wiggle" />
                                </span>
                            )}
                        </span>
                    </p>
                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogTrigger
                            asChild
                            className="absolute bottom-10 left-1/2 -translate-x-1/2"
                        >
                            <Button variant="ghost" size="icon">
                                <span className="sr-only">Settings</span>
                                <Settings2 className="!size-5" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Timer options</DialogTitle>
                                <DialogDescription className="sr-only">
                                    Make changes to the timer settings here.
                                </DialogDescription>
                            </DialogHeader>
                            <section className="space-y-4">
                                <p className="text-sm text-muted-foreground">Custom Time</p>
                                <Input
                                    type="number"
                                    onChange={handleCustomTimeChange}
                                    defaultValue={time / 60}
                                    placeholder="Add time in minutes"
                                    autoFocus
                                />
                            </section>
                            <section className="space-y-4">
                                <p className="text-sm text-muted-foreground">Presets</p>
                                <ul className="flex flex-wrap items-center gap-2">
                                    {presets.map((preset) => (
                                        <li key={preset.value}>
                                            <Button
                                                variant="outline"
                                                onClick={() => handlePresetClick(preset.value)}
                                                disabled={time / 60 === preset.value}
                                                className="w-24 disabled:bg-transparent disabled:text-foreground disabled:border-[2px] disabled:shadow-none"
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
                </div>
                <div className="space-x-4">
                    <Button onClick={startTimer} disabled={isRunning}>
                        <span>Start</span>
                        <Play size={15} />
                    </Button>
                    <Button onClick={pauseTimer} disabled={!isRunning}>
                        <span>Pause</span>
                        <Pause size={15} />
                    </Button>
                    <Button onClick={resetTimer} disabled={!isRunning}>
                        <span>Restart</span>
                        <RotateCcw size={15} />
                    </Button>
                </div>
            </section>
        </section>
    );
}
