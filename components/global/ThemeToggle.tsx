"use client";

import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";

const ChangeTheme = () => {
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
        <Button
            className="space-x-2 h-8 w-8 cursor-pointer grid place-content-center hover:bg-muted hover:text-muted-foreground"
            onClick={toggleTheme}
            variant="outline"
        >
            {hasMounted ? (
                <div>
                    <div className="relative size-4">
                        <MoonIcon
                            size={16}
                            className={`absolute top-0 left-1/2 -translate-x-1/2 transition-transform duration-500 ${
                                theme === "dark" || theme === "system" ? "scale-100" : "scale-0"
                            }`}
                        />
                        <SunIcon
                            size={16}
                            className={`absolute top-0 left-1/2 -translate-x-1/2 transition-transform duration-500 ${
                                theme === "light" ? "scale-100" : "scale-0"
                            }`}
                        />
                    </div>
                    <p className="sr-only">{theme === "dark" ? "Dark mode" : "Light mode"}</p>
                </div>
            ) : (
                <div className="size-4"></div>
            )}
        </Button>
    );
};

export default ChangeTheme;
