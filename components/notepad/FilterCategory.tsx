"use client";

import { getAllCategories } from "@/lib/notepad/crud";
import { Button } from "@/components/ui/button";
import { Table } from "@tanstack/react-table";
import { CircleX } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function FilterCategory({ table }: { table: Table<NotepadNoteValues> }) {
    const categories = getAllCategories();
    const cats = [{ categoryName: "All" }, ...categories];

    function handleFilter(value: string) {
        if (value === "All") {
            table.getColumn("category")?.setFilterValue(undefined);
        } else {
            table.getColumn("category")?.setFilterValue(value);
        }
    }

    return (
        <div className="flex items-center gap-2">
            <Select
                onValueChange={(value) => handleFilter(value)}
                value={(table.getColumn("category")?.getFilterValue() as string) ?? "All"}
                name="category filter"
            >
                <SelectTrigger className="w-[75px]">
                    <SelectValue placeholder="Filter by Category" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Categories</SelectLabel>
                        {cats.map((cat: NotepadCategoryValues) => (
                            <SelectItem key={cat.categoryName} value={cat.categoryName} className="hover:bg-muted-foreground cursor-pointer">
                                {cat.categoryName}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            <div>
                {typeof table.getColumn("category")?.getFilterValue() === "string" && (
                    <Button
                        variant="secondary"
                        className="cursor-pointer text-sm"
                        onClick={() => table.getColumn("category")?.setFilterValue(undefined)}
                    >
                        <span className="hidden sm:block">Reset</span>
                        <CircleX />
                    </Button>
                )}
            </div>
        </div>
    );
}
