"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { getAllCategories, getAllNotes } from "@/lib/notepad/crud";
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

type Props = {
    table?: Table<NotepadNoteValues>;
    setCurrentNotes?: Dispatch<SetStateAction<NotepadNoteValues[] | null>>;
};

export default function FilterCategory({ table, setCurrentNotes }: Props) {
    const categories = getAllCategories();
    const notes = getAllNotes();
    const cats = [{ categoryName: "All" }, ...categories];
    const [filterCat, setFilterCat] = useState<string>();

    function handleFilter(value: string) {
        if (value === "All") {
            table?.getColumn("category")?.setFilterValue(undefined);
            if (setCurrentNotes) setCurrentNotes(notes);
            setFilterCat(value);
        } else {
            table?.getColumn("category")?.setFilterValue(value);

            const filteredNotes = notes.filter(
                (note: NotepadNoteValues) => note.category === value
            );

            if (setCurrentNotes) setCurrentNotes(filteredNotes);
            setFilterCat(value);
        }
    }

    return (
        <div className="flex items-center gap-2">
            <Select
                onValueChange={(value) => handleFilter(value)}
                value={
                    table
                        ? (table?.getColumn("category")?.getFilterValue() as string) ?? "All"
                        : filterCat
                }
                name="category filter"
            >
                <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Filter by Category" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Categories</SelectLabel>
                        {cats.map((cat: NotepadCategoryValues) => (
                            <SelectItem key={cat.categoryName} value={cat.categoryName}>
                                {cat.categoryName}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            <div>
                {typeof table?.getColumn("category")?.getFilterValue() === "string" ||
                    (filterCat && (
                        <Button
                            variant="secondary"
                            className="cursor-pointer text-sm"
                            onClick={() => {
                                table?.getColumn("category")?.setFilterValue(undefined);
                                setFilterCat("");
                            }}
                        >
                            Reset
                            <CircleX />
                        </Button>
                    ))}
            </div>
        </div>
    );
}
