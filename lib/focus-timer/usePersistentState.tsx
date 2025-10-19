import { useEffect, useState } from "react";

export default function usePersistentState<T>(
    key: string,
    defaultValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
    const [value, setValue] = useState<T>(() => {
        if (typeof window !== "undefined") {
            try {
                const stored = localStorage.getItem(key);
                if (stored !== null) {
                    return JSON.parse(stored);
                }
            } catch (err) {
                console.warn(`Error reading localStorage key "${key}":`, err);
            }
        }
        return defaultValue;
    });

    // Save to localStorage on change
    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (err) {
            console.warn(`Error writing localStorage key "${key}":`, err);
        }
    }, [key, value]);

    // Sync across tabs
    useEffect(() => {
        const syncAcrossTabs = (event: StorageEvent) => {
            if (event.key === key && event.newValue !== null) {
                try {
                    setValue(JSON.parse(event.newValue));
                } catch (err) {
                    console.warn(`Error syncing localStorage key "${key}" across tabs:`, err);
                }
            }
        };

        window.addEventListener("storage", syncAcrossTabs);
        return () => window.removeEventListener("storage", syncAcrossTabs);
    }, [key]);

    return [value, setValue];
}
