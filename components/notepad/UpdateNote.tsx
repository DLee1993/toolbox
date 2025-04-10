"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { getAllNotes, updateNote } from "@/lib/notepad/crud";
import { NotifyUser } from "@/lib/global/NotifyUser";
import SelectCategory from "@/components/notepad/SelectCategory";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

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
        createdAt: note.createdAt,
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

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="secondary"
                    size="icon"
                    aria-label="edit note"
                    className="hover:bg-foreground hover:text-background"
                >
                    <Edit />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Update note</DialogTitle>
                    <DialogDescription className="sr-only">Create a new note</DialogDescription>
                </DialogHeader>
                <div className="my-5">
                    <form className="space-y-2">
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
                                className="resize-none min-h-24 formField peer"
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
                    </form>
                </div>
                <DialogFooter className="gap-5">
                    <Button
                        type="submit"
                        disabled={!data.title || !data.content ? true : false}
                        onClick={() =>
                            UpdateData({
                                title: data.title,
                                content: data.content,
                                category: selectedCategory ? selectedCategory : data.category,
                                id: data.id,
                                createdAt: data.createdAt,
                            })
                        }
                    >
                        Save changes
                    </Button>
                    <DialogClose
                        onClick={() => {
                            setError(false);
                            setData({
                                title: note.title,
                                content: note.content,
                                id: note.id,
                                createdAt: note.createdAt,
                            });
                        }}
                    >
                        Cancel
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
