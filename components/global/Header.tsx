"use client";

import { usePathname } from "next/navigation";
import BreadCrumbNav from "@/components/global/navigation/BreadCrumbNav";

export default function Header() {
    const pathname = usePathname();

    if (pathname !== "/") {
        return (
            <header className="sticky top-0 z-50 flex justify-between items-center border-b border-border bg-background px-2 sm:px-5">
                <BreadCrumbNav />
            </header>
        );
    }
}
