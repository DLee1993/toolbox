"use client";

import { useEffect, useState } from "react";
import { MoonIcon, SunIcon, SunMoonIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

const ChangeTheme = ({ open, isMobile }: { open: boolean; isMobile: boolean }) => {
    const [hasMounted, setHasMounted] = useState(false); // <-- add this
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setHasMounted(true);
    }, []);

    const toggleTheme = () => {
        if (theme == "dark") {
            setTheme("light");
        } else {
            setTheme("dark");
        }
    };

    return (
        <SidebarMenuItem onClick={toggleTheme}>
            <SidebarMenuButton
                asChild
                tooltip="Change theme"
                className="min-h-9 min-w-9 hover:bg-muted cursor-pointer group-data-[collapsible=icon]:!p-0"
            >
                {hasMounted ? (
                    <div className="w-full min-w-32 px-0">
                        <div className="relative min-h-9 min-w-9">
                            <MoonIcon
                                size={16}
                                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-500 ${
                                    theme === "dark" || theme === "system" ? "scale-100" : "scale-0"
                                }`}
                            />
                            <SunIcon
                                size={18}
                                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-500 ${
                                    theme === "light" ? "scale-100" : "scale-0"
                                }`}
                            />
                        </div>

                        <p
                            className={`flex items-center w-full min-w-32 ${
                                !open && !isMobile && "opacity-0"
                            }`}
                        >
                            {theme === "dark" ? "Dark mode" : "Light mode"}
                        </p>
                    </div>
                ) : (
                    <div className="w-full min-w-32 ml-2.5">
                        <SunMoonIcon size={16} />
                    </div>
                )}
            </SidebarMenuButton>
        </SidebarMenuItem>
    );
};

export default ChangeTheme;
