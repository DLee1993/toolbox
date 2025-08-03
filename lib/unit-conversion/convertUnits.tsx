import convert, { Unit } from "convert-units";

type Props = {
    amount: string;
    from: Unit | "";
    to: Unit | "";
    setResult: (result: number) => void;
    setError: (error: string) => void;
};

export const ConvertUnits = ({ amount, from, to, setResult, setError }: Props) => {
    try {
        if (!from || !to) throw new Error("Both units need to be selected");
        if (from && to) {
            const result = convert(Number(amount)).from(from).to(to).toFixed(2);
            setResult(parseFloat(result));
        }
    } catch (error) {
        setError(`${error}`);

        setTimeout(() => {
            setError("");
        }, 4000);
    }
};

export const MeasurementTypes = convert()
    .measures()
    .map((measurement) => {
        const units = convert()
            .list()
            .filter((unit) => unit.measure === measurement)
            .map((unit) => unit.abbr);
        return { measurement, units };
    });
