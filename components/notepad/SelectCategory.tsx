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

export default function SelectCategory({
    setSelectedCategory,
    defaultValue,
}: {
    setSelectedCategory: Dispatch<SetStateAction<string>>;
    defaultValue?: string;
}) {
    const categories = JSON.parse(localStorage.getItem("notepad-categories")!);

    return (
        <Select onValueChange={(value) => setSelectedCategory(value)} defaultValue={defaultValue}>
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
