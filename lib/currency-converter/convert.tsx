type Props = {
    amount: string;
    to: string;
    from: string;
    rates: {
        [key: string]: number;
    };
    setResult: (result: number) => void;
    setError: (error: string) => void;
};

export function ConvertCurrency({ amount, from, to, rates, setResult, setError }: Props) {
    const formattedValue = amount.replace(/,/g, "");
    const numberFormat = Number(formattedValue);

    if (!(from in rates)) {
        return setError(`Exchange rate for ${from} not found.`);
    }

    if (!(to in rates)) {
        return setError(`Exchange rate for ${to} not found.`);
    }

    const fromRate = rates[from]; // e.g., AUD = 1.95
    const toRate = rates[to]; // e.g., GBP = 1.0

    // Convert from source to GBP, then to target
    const gbpAmount = numberFormat / fromRate;
    const convertedAmount = gbpAmount * toRate;

    return setResult(convertedAmount);
}
