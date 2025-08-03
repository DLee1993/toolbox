type Props = {
    amount: string;
    to: string;
    rates: {
        [key: string]: number;
    };
    setResult: (result: number) => void;
    setError: (error: string) => void;
};

export function ConvertCurrency({ amount, to, rates, setResult, setError }: Props) {
    const formattedValue = amount.replace(/,/g, "");
    const numberFormat = Number(formattedValue);

    console.log(numberFormat)

    // Ensure the exchange rate exists for the target currency
    if (!(to in rates)) {
        setError(`Exchange rate for ${to} not found.`);
    }

    // Get the exchange rate of the target currency
    const exchangeRate = rates[to];

    // Calculate the converted amount
    const convertedAmount = numberFormat * exchangeRate;

    // Return the formatted result
    return setResult(convertedAmount);
}
