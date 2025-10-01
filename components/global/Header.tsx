"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getLocalizedGreeting } from "@/lib/global/GreetUser";
import BreadCrumbNav from "@/components/global/navigation/BreadCrumbNav";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Header() {
    const pathname = usePathname();
    const [greeting, setGreeting] = useState("");

    useEffect(() => {
        const locale = navigator.language;
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        setGreeting(getLocalizedGreeting(locale, timeZone));
    }, []);

    return (
        <header className="sticky top-0 z-50 flex justify-between items-center border-b border-border bg-background px-2 sm:px-5">
            <SidebarTrigger className="min-w-9 min-h-9 md:hidden" />
            {pathname !== "/" && <BreadCrumbNav />}
            {pathname === "/" && <h3>{greeting}</h3>}
        </header>
    );
}
