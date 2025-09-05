import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface LengthProps {
    type: string;
    pwLength?: number;
    pcLength?: number;
    setPwLength?: React.Dispatch<React.SetStateAction<number>>;
    setPcLength?: React.Dispatch<React.SetStateAction<number>>;
}

export default function SelectLength({ type, pwLength, pcLength, setPwLength, setPcLength }: LengthProps) {
    const pwLengthOptions = Array.from({ length: 30 - 8 + 1 }, (_, i) => i + 8);
    const pcLengthOptions = Array.from({ length: 16 - 6 + 1 }, (_, i) => i + 6);

    return (
        <Select
            defaultValue={type === "password" ? pwLength?.toString() : pcLength?.toString()}
            onValueChange={(value) => {
                if (type === "password" && setPwLength) {
                    setPwLength(Number(value));
                } else if (type === "code" && setPcLength) {
                    setPcLength(Number(value));
                }
            }}
        >
            <SelectTrigger className="w-16 capitalize">
                <SelectValue placeholder={`${type} Length`} />
            </SelectTrigger>
            <SelectContent className="h-80">
                <SelectGroup>
                    <SelectLabel>Select Length Required</SelectLabel>
                    {type === "password"
                        ? pwLengthOptions.map((option, i) => (
                              <SelectItem key={i} value={option.toString()}>
                                  {option}
                              </SelectItem>
                          ))
                        : pcLengthOptions.map((option, i) => (
                              <SelectItem key={i} value={option.toString()}>
                                  {option}
                              </SelectItem>
                          ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
