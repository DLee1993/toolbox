import { Dispatch, SetStateAction } from "react";
import { Calendar } from "@/components/ui/calendar";

export default function SelectDate({
    selectedDate,
    setSelectedDate,
    defaultValue,
}: {
    selectedDate: Date | undefined;
    setSelectedDate: Dispatch<SetStateAction<Date | undefined>>;
    defaultValue?: Date | undefined;
}) {
    return (
        <Calendar
            mode="single"
            selected={defaultValue ? defaultValue : selectedDate}
            onSelect={setSelectedDate}
            className="rounded-lg border z-0"
        />
    );
}
