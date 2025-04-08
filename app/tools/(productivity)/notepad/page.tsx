"use client";

import { useEffect, useState } from "react";
import { getAllNotes, deleteNote } from "@/lib/notepad/crud";
import NewNote from "@/components/notepad/NewNote";

export default function Notepad() {
    // all notes
    const [currentNotes, setCurrentNotes] = useState<NotepadNoteValues[] | null>(null);

    useEffect(() => {
        const notes = getAllNotes();
        setCurrentNotes(notes);
    }, []);

    function deleteData(id: string) {
        const updatedNotes = deleteNote(id);
        setCurrentNotes(updatedNotes);
    }

    return (
        <section className="h-screen w-full py-10">
            <header className="place-items-end">
                <div className="space-x-2">
                    <NewNote setCurrentNotes={setCurrentNotes} />
                </div>
            </header>
            <section className="mt-10">
                {currentNotes
                    ? currentNotes.map((note: NotepadNoteValues) => (
                          <div key={note.id}>
                              <p>{note.title}</p>
                              <button onClick={() => deleteData(note.id)}>delete</button>
                          </div>
                      ))
                    : ""}
            </section>
        </section>
    );
}
