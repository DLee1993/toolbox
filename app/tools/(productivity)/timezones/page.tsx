"use client";

import { useEffect, useState } from "react";
import { TZDate } from "@date-fns/tz";
import { addHours, format } from "date-fns";
import TimezoneSelect from "@/components/timezones/TimezoneSelect";

export default function TimeZones() {
    const [selectedTZ, setSelectedTZ] = useState("");
    const [timezone, setTimezone] = useState("");

    // if (selectedTZ !== "") {
    //     const tzDate = new TZDate(new Date(), selectedTZ);
    //     console.log(tzDate);
    // }

    return (
        <section className="w-full flex flex-col justify-start items-center py-10 space-y-10">
            <section>
                <h1 className="text-2xl md:text-3xl font-semibold max-w-2xl text-center">
                    Never lose track of time—anywhere, any zone, any moment.{" "}
                </h1>
            </section>
            <section>
                <p>{timezone}</p>
            </section>
            <TimezoneSelect setSelectedTZ={setSelectedTZ} />
        </section>
    );
}
