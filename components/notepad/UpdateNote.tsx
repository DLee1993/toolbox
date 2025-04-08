"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { GetRandomID } from "@/lib/global/GetRandomId";
// import { NotifyUser } from "@/lib/global/NotifyUser";
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

export default function UpdateNote({
    setCurrentNotes,
    id,
}: {
    setCurrentNotes: Dispatch<SetStateAction<NotepadNoteValues[] | null>>;
    id: string;
}) {
    // dialog open/close
    const [isOpen, setIsOpen] = useState(false);
    // selected category state
    const [selectedCategory, setSelectedCategory] = useState("");

    // sets all data, this is used to SubmitData for both notes and categories
    const [data, setData] = useState<NotepadNoteValues>({
        title: "",
        content: "",
        id: "",
        createdAt: "",
    });

    // Handles changes to all inputs
    function HandleInputChange(e: { target: { name: string; value: string } }) {
        const { name, value } = e.target;

        setData((prevState) => ({ ...prevState, [name]: value }));
    }

    // Submits data from each form
    function SubmitData(data: NotepadNoteValues) {
        const updatedNotes = addNote(data);
        setIsOpen(false);
        setCurrentNotes(updatedNotes);
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="hover:bg-foreground hover:text-background">
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
                                className="formField peer"
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
                                className="resize-none min-h-24 formField peer"
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
                            })
                        }
                    >
                        Save changes
                    </Button>
                    <DialogClose>Cancel</DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
