"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { GetRandomID } from "@/lib/global/GetRandomId";
import { addNote } from "@/lib/notepad/crud";
import { NotifyUser } from "@/lib/global/NotifyUser";
import SelectCategory from "@/components/notepad/SelectCategory";
import { PlusIcon } from "lucide-react";
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

export default function NewNote({
    setCurrentNotes,
}: {
    setCurrentNotes: Dispatch<SetStateAction<NotepadNoteValues[] | null>>;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [error, setError] = useState(false);
    const [data, setData] = useState<NotepadNoteValues>({
        title: "",
        content: "",
        id: "",
        createdAt: "",
        completed: false,
    });

    function HandleInputChange(e: { target: { name: string; value: string } }) {
        const { name, value } = e.target;

        setData((prevState) => ({ ...prevState, [name]: value }));
    }

    function SubmitData(data: NotepadNoteValues) {
        const updatedNotes = addNote(data);

        if (updatedNotes.duplicate) {
            NotifyUser({ type: "Error", message: "Title already exists" });
            setError(true);
        } else {
            setIsOpen(false);
            setError(false);
            setCurrentNotes(updatedNotes.currentNotes);
            NotifyUser({ type: "Success", message: "New note created" });
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="w-fit hover:bg-foreground hover:text-background">
                    New Note <PlusIcon />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create new note</DialogTitle>
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
                            />
                            <Label
                                htmlFor="content"
                                className="pointer-events-none absolute text-sm duration-300 bg-background transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2  peer-placeholder-shown:top-6 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-blue-600 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 capitalize"
                            >
                                Content
                            </Label>
                        </fieldset>
                        <fieldset>
                            <SelectCategory setSelectedCategory={setSelectedCategory} />
                        </fieldset>
                    </form>
                </div>
                <DialogFooter className="gap-5">
                    <Button
                        type="submit"
                        disabled={!data.title || !data.content ? true : false}
                        onClick={() =>
                            SubmitData({
                                title: data.title,
                                content: data.content,
                                category: selectedCategory,
                                id: GetRandomID(),
                                createdAt: new Date().toISOString(),
                                completed: data.completed,
                            })
                        }
                    >
                        Save changes
                    </Button>
                    <DialogClose onClick={() => setError(false)}>Cancel</DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
