"use client";

import React, { useState, useEffect, Dispatch, SetStateAction, useRef, useCallback } from "react";

import Timer from "@/components/focus-timer/timer";
import Options from "@/components/focus-timer/options";
import Alarm from "@/components/focus-timer/alarm";

export default function FocusTimer() {
    const [time, setTime] = useState(() => {
        const stored = localStorage.getItem("time");
        return stored ? parseInt(stored) : 300;
    });
    const [remainingTime, setRemainingTime] = useState(time);
    const [isRunning, setIsRunning] = useState(false);
    const [isBreak, setIsBreak] = useState(false);
    const [breakTime, setBreakTime] = useState(() => {
        const stored = localStorage.getItem("break");
        return stored ? parseInt(stored) : 300;
    });
    const [remainingBreakTime, setRemainingBreakTime] = useState(breakTime);
    const timerSound = useRef<HTMLAudioElement | null>(null);
    const [alarm, setAlarm] = useState(() => {
        const stored = localStorage.getItem("alarm");
        return stored ? JSON.parse(stored) : true;
    });
    const [sound, setSound] = useState(() => {
        const stored = localStorage.getItem("sound");
        return stored ? JSON.parse(stored) : true;
    });
    const [short, setShort] = useState(() => {
        const stored = localStorage.getItem("short");
        return stored ? JSON.parse(stored) : 1;
    });
    const [medium, setMedium] = useState(() => {
        const stored = localStorage.getItem("medium");
        return stored ? JSON.parse(stored) : 5;
    });
    const [long, setLong] = useState(() => {
        const stored = localStorage.getItem("long");
        return stored ? JSON.parse(stored) : 30;
    });

    // Utility function to update localStorage and state
    const updateSettings = (
        key: string,
        value: boolean,
        setter: Dispatch<SetStateAction<boolean>>
    ) => {
        localStorage.setItem(key, JSON.stringify(value));
        setter(value);
    };

    const updateSessionTime = (
        key: string,
        value: string,
        setter: Dispatch<SetStateAction<string>>
    ) => {
        localStorage.setItem(key, value);
        setter(value);
    };

    const startTimer = () => {
        setIsRunning(true);
        setIsBreak(false)
    };

    const pauseTimer = () => {
        setIsRunning(false);
    };

    const resetTimer = () => {
        setRemainingTime(time);
        setIsRunning(false);
        setIsBreak(false)
    };

    const toggleAlarm = () => updateSettings("alarm", !alarm, setAlarm);
    const toggleSound = () => updateSettings("sound", !sound, setSound);

    const calculateTime = (newTime: number) => {
        const time = newTime * 60;
        setIsRunning(false);
        setTime(time);
        localStorage.setItem("time", JSON.stringify(time));
        setRemainingTime(time);
    };

    const handleBreakTimeClick = (time: number) => {
        const breakTime = time * 60;

        localStorage.setItem("break", JSON.stringify(breakTime));
        setBreakTime(breakTime);
    };

    const cancelBreak = useCallback(() => {
        setRemainingTime(time);
        setIsBreak(false);

        setTimeout(() => {
            setRemainingBreakTime(breakTime);
        }, 1000);
    }, [time, breakTime]);

    useEffect(() => {
        let timer: NodeJS.Timeout | undefined;

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

        return () => clearInterval(timer);
    }, [isRunning]);

    useEffect(() => {
        if (remainingTime === 0 && isRunning) {
            setIsRunning(false);
            setRemainingTime(time);

            if (alarm || sound) {
                setIsBreak(true);
            }
        }
    }, [remainingTime, isRunning, time, alarm, sound]);

    useEffect(() => {
        let timer: NodeJS.Timeout | undefined;

        if (alarm) {
            if (isBreak) {
                timer = setInterval(() => {
                    setRemainingBreakTime((prevTime) => {
                        if (prevTime <= 1) {
                            clearInterval(timer);
                            return 0;
                        }
                        return prevTime - 1;
                    });
                }, 1000);
            }
        }

        return () => clearInterval(timer);
    }, [isBreak, alarm]);

    useEffect(() => {
        if (alarm) {
            if (remainingBreakTime === 0 && isBreak) {
                cancelBreak();
            }
        }
    }, [alarm, remainingBreakTime, isBreak, cancelBreak]);

    useEffect(() => {
        timerSound.current = new Audio("/ding.mp3");
    }, []);

    return (
        <section className="padding height max-w-8xl mx-auto relative flex flex-col lg:flex-row justify-evenly items-center gap-10">
            <div className="relative min-h-80 flex justify-center items-center">
                {!alarm && isBreak && (
                    <p className="text-accent-foreground bg-accent w-36 h-8 flex justify-center items-center rounded-md absolute top-0 lg:-top-10 left-1/2 -translate-x-1/2">
                        Time&apos;s up!
                    </p>
                )}

                <Timer
                    start={startTimer}
                    pause={pauseTimer}
                    reset={resetTimer}
                    remaining={remainingTime}
                    running={isRunning}
                />
            </div>
            <Options
                short={short}
                medium={medium}
                long={long}
                setShort={setShort}
                setMedium={setMedium}
                setLong={setLong}
                updateSessionTime={updateSessionTime}
                alarm={alarm}
                toggleAlarm={toggleAlarm}
                sound={sound}
                toggleSound={toggleSound}
                calculateTime={calculateTime}
                handleBreakTimeClick={handleBreakTimeClick}
                breakTime={breakTime}
                time={time}
            />
            <Alarm
                isBreak={isBreak}
                breakTime={remainingBreakTime}
                cancelBreak={cancelBreak}
                sound={sound}
                alarm={alarm}
            />
        </section>
    );
}
