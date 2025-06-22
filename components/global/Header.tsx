"use client";

import { usePathname } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import BreadCrumbNav from "@/components/global/navigation/BreadCrumbNav";

export default function Header() {
    const pathname = usePathname();

    if (pathname !== "/") {
        return (
            <header className="sticky top-0 z-50 flex justify-between items-center border-b border-border bg-background px-2 sm:px-5">
                <SidebarTrigger className="min-w-9 min-h-9 md:hidden" />
                <BreadCrumbNav />
            </header>
        );
    }
}
