import { Dispatch, SetStateAction } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { getAllCategories } from "@/lib/notepad/crud";

export default function SelectCategory({
    setSelectedCategory,
    defaultValue,
}: {
    setSelectedCategory: Dispatch<SetStateAction<string>>;
    defaultValue?: string;
}) {
    const categories = getAllCategories();

    return (
        <Select
            onValueChange={(value) => setSelectedCategory(value)}
            defaultValue={defaultValue}
            name="select category"
        >
            <SelectTrigger>
                <SelectValue placeholder="Select a Category" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel className="border-b border-border">Categories</SelectLabel>
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
