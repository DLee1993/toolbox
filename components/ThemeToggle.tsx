"use client";
import React from "react";
import { SidebarMenuButton } from "./ui/sidebar";
import { Moon } from "lucide-react";
import { useTheme } from "next-themes";

const ChangeTheme = () => {
    const { theme, setTheme } = useTheme();

    console.log(theme)

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
            className="space-x-2 text-base cursor-pointer"
            onClick={toggleTheme}
        >
            <p>
                <Moon size={16} />
                <span className="min-w-52">Dark mode</span>
            </p>
        </SidebarMenuButton>
    );
};

export default ChangeTheme;
