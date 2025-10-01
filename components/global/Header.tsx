"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getLocalizedGreeting } from "@/lib/global/GreetUser";
import BreadCrumbNav from "@/components/global/navigation/BreadCrumbNav";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Header() {
    const pathname = usePathname();
    const [greeting, setGreeting] = useState("");
    const [dateTime, setDateTime] = useState("");

    useEffect(() => {
        const updateGreeting = () => {
            const locale = navigator.language;
            const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const { greeting, dateTime } = getLocalizedGreeting(locale, timeZone);
            setGreeting(greeting);
            setDateTime(dateTime);
        };

        updateGreeting(); // Initial call
        const interval = setInterval(updateGreeting, 60_000); // Update every minute

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    return (
        <header className="sticky top-0 z-50 flex justify-between items-center border-b border-border bg-background px-2 sm:px-5">
            <SidebarTrigger className="min-w-9 min-h-9 md:hidden" />
            {pathname !== "/" && <BreadCrumbNav />}
            {pathname === "/" && <h3>{greeting}</h3>}
            {pathname === "/" && <p>{dateTime}</p>}
        </header>
    );
}
