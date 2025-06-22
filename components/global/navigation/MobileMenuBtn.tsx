"use client";

import { Button } from "@/components/ui/button";
import { Equal } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";

export default function MobileMenuBtn() {
    const { openMobile, setOpenMobile } = useSidebar();

    return (
        <Button
            onClick={() => setOpenMobile(!openMobile)}
            className="fixed z-50 bottom-5 left-1/2 -translate-x-1/2 md:hidden"
        >
            Menu <Equal />
        </Button>
    );
}
