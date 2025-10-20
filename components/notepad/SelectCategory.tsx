import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { getAllCategories } from "@/lib/notepad/crud";

export default function SelectCategory({
    HandleInputChange,
    defaultValue,
}: {
    defaultValue?: string;
    HandleInputChange: (e: {
        target: {
            name: string;
            value: string;
        };
    }) => void;
}) {
    const categories = getAllCategories();

    return (
        <Select
            onValueChange={(value) => HandleInputChange({ target: { name: "category", value } })}
            name="category"
            value={defaultValue}
        >
            <SelectTrigger className="min-h-12">
                <SelectValue
                    placeholder={
                        <p>
                            Select a Category <span className="text-xs">(optional)</span>
                        </p>
                    }
                />
            </SelectTrigger>
            <SelectContent className="h-52">
                <SelectGroup>
                    {categories.map((cat: string, i: number) => (
                        <SelectItem key={i} value={cat}>
                            {cat}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
