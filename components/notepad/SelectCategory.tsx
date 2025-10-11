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
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a Category" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    {categories.map((cat: NotepadCategoryValues) => (
                        <SelectItem key={cat.categoryName} value={cat.categoryName}>
                            {cat.categoryName}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
