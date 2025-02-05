"use client";

import { useEffect, useState } from "react";
import { SidebarMenuButton } from "../ui/sidebar";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

const ChangeTheme = () => {
    const [hasMounted, setHasMounted] = useState(false);
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
        <SidebarMenuButton
            asChild
            tooltip="Toggle theme"
            className="space-x-2 min-h-10 min-w-10 cursor-pointer"
            onClick={toggleTheme}
        >
            {hasMounted ? (
                <div>
                    <div className="relative size-4 mr-1 md:mr-5">
                        <MoonIcon
                            size={16}
                            className={`ml-1 absolute top-0 left-0 transition-transform duration-500 ${
                                theme === "dark" || theme === "system" ? "scale-100" : "scale-0"
                            }`}
                        />
                        <SunIcon
                            size={16}
                            className={`ml-1 absolute top-0 left-0 transition-transform duration-500 ${
                                theme === "light" ? "scale-100" : "scale-0"
                            }`}
                        />
                    </div>
                    <p className="min-w-52">{theme === "dark" ? "Dark mode" : "Light mode"}</p>
                </div>
            ) : (
                <div className="size-4"></div>
            )}
        </SidebarMenuButton>
    );
};

export default ChangeTheme;
