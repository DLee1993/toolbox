import { Dispatch, SetStateAction } from "react";
import { useTimezoneSelect, allTimezones } from "react-timezone-select";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const labelStyle = "altName";
const timezones = {
    ...allTimezones,
};

type Props = {
    setSelectedTZ: Dispatch<SetStateAction<string>>;
};

export default function TimezoneSelect({ setSelectedTZ }: Props) {
    const { options, parseTimezone } = useTimezoneSelect({ labelStyle, timezones });

    return (
        <Select
            onValueChange={(value) => {
                parseTimezone(value);
                setSelectedTZ(value);
            }}
        >
            <SelectTrigger className="w-full max-w-md">
                <SelectValue placeholder="Select a timezone" />
            </SelectTrigger>
            <SelectContent className="w-full max-w-md">
                <SelectGroup>
                    <SelectLabel>Timezones</SelectLabel>
                    {options.map((option, i) => (
                        <SelectItem key={i} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
