// lib/getLocalizedGreeting.ts

export function getLocalizedGreeting(
    locale: string = typeof navigator !== "undefined" ? navigator.language : "en-GB",
    timeZone: string = Intl.DateTimeFormat().resolvedOptions().timeZone
): string {
    const date = new Date();
    const formatter = new Intl.DateTimeFormat(locale, {
        hour: "numeric",
        hour12: false,
        timeZone,
    });

    const hour = parseInt(formatter.format(date), 10);

    if (hour >= 5 && hour < 12) return "Good morning!";
    if (hour >= 12 && hour < 17) return "Good afternoon!";
    if (hour >= 17 && hour < 21) return "Good evening!";
    return "Good night!";
}
