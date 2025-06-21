"use client";

import { useEffect, useState } from "react";
import { getAllNotes } from "@/lib/notepad/crud";
import { NotepadTable } from "@/components/notepad/NotepadTable";

export default function Notepad() {
    // get all notes
    const [currentNotes, setCurrentNotes] = useState<NotepadNoteValues[] | null>(null);

    useEffect(() => {
        const notes = getAllNotes();
        setCurrentNotes(notes);
    }, []);

    return (
        <section className="py-10">
            <NotepadTable
                data={currentNotes ? currentNotes : []}
                setCurrentNotes={setCurrentNotes}
            />
        </section>
    );
}
