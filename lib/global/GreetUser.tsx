// lib/getLocalizedGreeting.ts
import { AiOutlineCoffee, AiOutlineSun, AiOutlineMoon, AiOutlineSmile } from "react-icons/ai";

export function getLocalizedGreeting(
    locale: string = typeof navigator !== "undefined" ? navigator.language : "en-GB",
    timeZone: string = Intl.DateTimeFormat().resolvedOptions().timeZone
) {
    const date = new Date();
    const formatter = new Intl.DateTimeFormat(locale, {
        hour: "numeric",
        hour12: false,
        timeZone,
    });
    const hour = parseInt(formatter.format(date), 10);

    if (hour >= 0 && hour < 12) {
        return { message: "Good morning", icon: <AiOutlineCoffee /> };
    }
    if (hour >= 12 && hour < 17) {
        return { message: "Good afternoon", icon: <AiOutlineSun /> };
    }
    if (hour >= 17 && hour < 24) {
        return { message: "Good evening", icon: <AiOutlineMoon /> };
    }

    return { message: "Hello User", icon: <AiOutlineSmile /> };
}
