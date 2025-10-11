"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { deleteNote, getAllNotes, updateNote } from "@/lib/notepad/crud";
import { NotifyUser } from "@/lib/global/NotifyUser";
import SelectCategory from "@/components/notepad/SelectCategory";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

export default function UpdateNote({
    setCurrentNotes,
    id,
}: {
    setCurrentNotes: Dispatch<SetStateAction<NotepadNoteValues[] | null>>;
    id: string;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [error, setError] = useState(false);
    const note = getAllNotes().filter((n: NotepadNoteValues) => n.id === id)[0];
    const [data, setData] = useState<NotepadNoteValues>({
        title: note.title,
        content: note.content,
        id: note.id,
        category: note.category,
        createdAt: note.createdAt,
        completed: note.completed,
    });

    function HandleInputChange(e: { target: { name: string; value: string } }) {
        const { name, value } = e.target;

        setData((prevState) => ({ ...prevState, [name]: value }));
    }

    function UpdateData(data: NotepadNoteValues) {
        const updatedNotes = updateNote(data);

        if (updatedNotes.duplicate) {
            NotifyUser({ type: "Error", message: "Title already exists" });
            setError(true);
        } else {
            setIsOpen(false);
            setError(false);
            setCurrentNotes(updatedNotes.existingData);
            NotifyUser({ type: "Success", message: "Note updated" });
        }
    }

    function deleteData(id: string) {
        const updatedNotes = deleteNote(id);
        setCurrentNotes(updatedNotes);
    }

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="edit note">
                    ...
                </Button>
            </SheetTrigger>
            <SheetContent className="sm:max-w-[425px] flex flex-col justify-between">
                <SheetHeader>
                    <SheetTitle>Update note</SheetTitle>
                    <SheetDescription className="sr-only">Create a new note</SheetDescription>
                </SheetHeader>
                <div className="my-5 flex-1">
                    <form className="space-y-4">
                        <fieldset className="relative">
                            <Input
                                name="title"
                                id="title"
                                placeholder=" "
                                className={`formField peer ${error && "border-red-600"}`}
                                onChange={HandleInputChange}
                                value={data.title}
                                autoFocus
                            />
                            <Label
                                htmlFor="title"
                                className="pointer-events-none absolute text-sm duration-300 bg-background transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-blue-600 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 capitalize"
                            >
                                Title
                            </Label>
                        </fieldset>
                        <fieldset className="relative">
                            <Textarea
                                name="content"
                                id="content"
                                placeholder=" "
                                className="resize-none min-h-36 formField peer"
                                onChange={HandleInputChange}
                                value={data.content}
                            />
                            <Label
                                htmlFor="content"
                                className="pointer-events-none absolute text-sm duration-300 bg-background transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2  peer-placeholder-shown:top-6 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-blue-600 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 capitalize"
                            >
                                Content
                            </Label>
                        </fieldset>
                        <fieldset>
                            <SelectCategory
                                setSelectedCategory={setSelectedCategory}
                                defaultValue={note.category}
                            />
                        </fieldset>
                        <fieldset>select a date goes here</fieldset>
                        <fieldset className="flex items-center gap-2">
                            <Checkbox
                                name="completed"
                                id="completed"
                                checked={data.completed}
                                value={JSON.stringify(data.completed)}
                                onCheckedChange={() =>
                                    setData({ ...data, completed: !data.completed })
                                }
                            />
                            <Label
                                htmlFor="completed"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Mark as complete
                            </Label>
                        </fieldset>
                    </form>
                </div>
                <SheetFooter className="w-full min-h-14 border-t border-border flex flex-row !justify-between items-center">
                    <Button
                        variant="destructive"
                        aria-label="delete note"
                        onClick={() => deleteData(note.id)}
                    >
                        Delete
                    </Button>

                    <Button
                        type="submit"
                        variant="secondary"
                        disabled={!data.title || !data.content ? true : false}
                        onClick={() =>
                            UpdateData({
                                title: data.title,
                                content: data.content,
                                category: selectedCategory ? selectedCategory : data.category,
                                id: data.id,
                                createdAt: data.createdAt,
                                completed: data.completed,
                            })
                        }
                    >
                        Save
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
