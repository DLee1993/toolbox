"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getLocalizedGreeting } from "@/lib/global/GreetUser";
import BreadCrumbNav from "@/components/global/navigation/BreadCrumbNav";
import { SidebarTrigger } from "@/components/ui/sidebar";
import HelpProvider from "@/components/global/HelpProvider";

type Greeting = {
    message: string;
    icon: React.ReactNode;
};

export default function Header() {
    const pathname = usePathname();

    const [greeting, setGreeting] = useState<Greeting>({
        message: "",
        icon: undefined, // default icon
    });

    useEffect(() => {
        const locale = navigator.language;
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const greeting = getLocalizedGreeting(locale, timeZone);
        setGreeting({ message: greeting.message, icon: greeting.icon });
    }, []);

    return (
        <header className="flex justify-between items-center px-2 md:px-5">
            <div className="flex justify-start items-center gap-2">
                <SidebarTrigger className="min-w-9 min-h-9 md:hidden" />
                <div className="hidden min-[520px]:block">
                    {pathname !== "/" && pathname !== "/settings" && <BreadCrumbNav />}
                </div>
                {(pathname === "/" || pathname === "/settings") && (
                    <p className="flex items-center gap-2 text-sm">
                        {greeting.message}
                        <span>{greeting.icon}</span>
                    </p>
                )}
            </div>
            {pathname !== "/" && pathname !== "/settings" && <HelpProvider />}
        </header>
    );
}
