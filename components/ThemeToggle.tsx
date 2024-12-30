"use client";
import React, { useEffect, useState } from "react";
import { SidebarMenuButton } from "./ui/sidebar";
import { Moon } from "lucide-react";

const ChangeTheme = () => {
    const [theme, setTheme] = useState("dark");

    const toggleTheme = () => {
        const currentTheme = document.body.getAttribute("data-theme");

        if (currentTheme === "dark") {
            document.body.setAttribute("data-theme", "light");
        } else {
            document.body.setAttribute("data-theme", "dark");
        }
    };

    useEffect(() => {
        const htmlElement = document.body;

        if (theme === "system") {
            // Use system preference
            const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
            setTheme(prefersDarkMode ? "dark" : "light");
        } else {
            htmlElement.setAttribute("data-theme", theme);
        }
    }, [theme]);

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
