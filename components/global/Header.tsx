"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getLocalizedGreeting } from "@/lib/global/GreetUser";
import BreadCrumbNav from "@/components/global/navigation/BreadCrumbNav";
import { SidebarTrigger } from "@/components/ui/sidebar";
import HelpProvider from "@/components/global/HelpProvider";

export default function Header() {
    const pathname = usePathname();
    const [greeting, setGreeting] = useState("");

    useEffect(() => {
        const locale = navigator.language;
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        setGreeting(getLocalizedGreeting(locale, timeZone));
    }, []);

    return (
        <header className="sticky top-0 z-50 flex justify-between items-center border-b border-border bg-background px-2 md:px-5">
            <div className="flex justify-start items-center gap-2">
                <SidebarTrigger className="min-w-9 min-h-9 md:hidden" />
                <div className="hidden min-[520px]:block">
                    {pathname !== "/" && pathname !== "/settings" && <BreadCrumbNav />}
                </div>
                {(pathname === "/" || pathname === "/settings") && <h3>{greeting}</h3>}
            </div>
            {pathname !== "/" && pathname !== "/settings" && <HelpProvider />}
        </header>
    );
}
