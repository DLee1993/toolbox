"use client";

import { useEffect, useState } from "react";
import { ITimezoneOption } from "react-timezone-select";
import { TZDate } from "@date-fns/tz";
import { format } from "date-fns";
import TimezoneSelect from "@/components/timezones/TimezoneSelect";

export default function TimeZones() {
    const [tz, setTz] = useState<ITimezoneOption | undefined>();
    const [currentTz, setCurrentTz] = useState<ITimezoneOption | undefined>();
    const [selectedTimezone, setSelectedTimezone] = useState({
        date: "",
        time: "",
        location: "",
        offset: "",
        timezone: "",
        name: "",
    });
    const [currentTimezone, setCurrentTimezone] = useState({
        date: "",
        time: "",
        location: "",
        offset: "",
        timezone: "",
        name: "",
    });

    useEffect(() => {
        if (!currentTz) return;
        const label = currentTz?.value;
        const currentDate = new Date();

        const timezoneSelected = new TZDate(currentDate, label);

        setCurrentTimezone({
            date: format(timezoneSelected, "dd MMM yyyy"),
            time: format(timezoneSelected, "HH:mm aaaa"),
            location: currentTz?.label.replace(/\([^)]*\)/g, "").trim() || "" || "",
            offset: String(currentTz?.offset ?? ""),
            timezone: currentTz?.value || "",
            name: currentTz?.altName || "",
        });
    }, [currentTz]);

    useEffect(() => {
        if (!tz) return;
        const label = tz?.value;
        const currentDate = new Date();
        const timezoneSelected = new TZDate(currentDate, label);

        setSelectedTimezone({
            date: format(timezoneSelected, "dd MMM yyyy"),
            time: format(timezoneSelected, "HH:mm aaaa"),
            location: tz?.label.replace(/\([^)]*\)/g, "").trim() || "",
            offset: String(tz?.offset ?? ""),
            timezone: tz?.value || "",
            name: tz?.altName || "",
        });
    }, [tz]);

    return (
        <section className="flex flex-col justify-start items-center py-10 space-y-20">
            <h1 className="text-2xl md:text-3xl font-semibold max-w-2xl text-center">
                Never lose track of time — anywhere, any zone, any moment.{" "}
            </h1>
            <TimezoneSelect tz={tz} setTz={setTz} setCurrentTz={setCurrentTz} />
            <section className="flex flex-col gap-10 w-11/12 sm:w-full">
                {tz ? (
                    <section className="space-y-10">
                        <article className="space-y-2">
                            <h2 className="text-2xl font-bold">{selectedTimezone.location}</h2>
                            <span className="flex space-x-5 text-sm">
                                <p>{selectedTimezone.date}</p>
                                <p>{selectedTimezone.time}</p>
                            </span>
                        </article>
                        <ul className="flex gap-10 flex-wrap">
                            {selectedTimezone.name && (
                                <li className="space-y-2">
                                    <h3 className="text-sm text-muted-foreground">
                                        Timezone name:
                                    </h3>
                                    <p className="font-semibold">{selectedTimezone.name}</p>
                                </li>
                            )}
                            {selectedTimezone.offset && (
                                <li className="space-y-2">
                                    <h3 className="text-sm text-muted-foreground">
                                        Timezone offset:
                                    </h3>
                                    <p className="font-semibold">{selectedTimezone.offset} hours</p>
                                </li>
                            )}
                            {selectedTimezone.timezone && (
                                <li className="space-y-2">
                                    <h3 className="text-sm text-muted-foreground">Timezone:</h3>
                                    <p className="font-semibold">{selectedTimezone.timezone}</p>
                                </li>
                            )}
                        </ul>
                    </section>
                ) : (
                    <section className="space-y-10">
                        <article className="space-y-2">
                            <h2 className="text-2xl font-bold">{currentTimezone.location}</h2>
                            <span className="flex space-x-5 text-sm">
                                <p>{currentTimezone.date}</p>
                                <p>{currentTimezone.time}</p>
                            </span>
                        </article>
                        <ul className="flex gap-10">
                            {currentTimezone.name && (
                                <li className="space-y-2">
                                    <h3 className="text-sm text-muted-foreground">
                                        Timezone name:
                                    </h3>
                                    <p className="font-semibold">{currentTimezone.name}</p>
                                </li>
                            )}
                            {currentTimezone.offset && (
                                <li className="space-y-2">
                                    <h3 className="text-sm text-muted-foreground">
                                        Timezone offset:
                                    </h3>
                                    <p className="font-semibold">{currentTimezone.offset} hours</p>
                                </li>
                            )}
                            {currentTimezone.timezone && (
                                <li className="space-y-2">
                                    <h3 className="text-sm text-muted-foreground">Timezone:</h3>
                                    <p className="font-semibold">{currentTimezone.timezone}</p>
                                </li>
                            )}
                        </ul>
                    </section>
                )}
            </section>
        </section>
    );
}
