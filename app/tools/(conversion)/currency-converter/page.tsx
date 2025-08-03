import CurrentConverter from "./CurrencyConverter";

export default async function ExchangePage() {
    const res = await fetch("https://open.er-api.com/v6/latest/GBP", {
        next: { revalidate: 86400 }, // ISR: once per day
    });

    if (!res.ok) {
        throw new Error("Failed to fetch exchange rates");
    }

    const data = await res.json();

    return <CurrentConverter initialRates={data.rates} />;
}
