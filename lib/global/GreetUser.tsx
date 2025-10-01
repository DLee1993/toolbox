export function getLocalizedGreeting(
    locale: string = typeof navigator !== "undefined" ? navigator.language : "en-GB",
    timeZone: string = Intl.DateTimeFormat().resolvedOptions().timeZone
): { greeting: string; dateTime: string } {
    const date = new Date();

    const hour = parseInt(
        new Intl.DateTimeFormat(locale, {
            hour: "numeric",
            hour12: false,
            timeZone,
        }).format(date),
        10
    );

    const greeting =
        hour >= 5 && hour < 12
            ? "Good morning"
            : hour >= 12 && hour < 17
            ? "Good afternoon"
            : hour >= 17 && hour < 21
            ? "Good evening"
            : "Good night";

    const dateTime = new Intl.DateTimeFormat(locale, {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone,
    }).format(date);

    return { greeting, dateTime };
}
