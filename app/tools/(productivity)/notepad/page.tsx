"use client";

import { useEffect, useState } from "react";
import { getAllNotes, deleteNote } from "@/lib/notepad/crud";
import NewNote from "@/components/notepad/NewNote";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import UpdateNote from "@/components/notepad/UpdateNote";

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
        <section className="h-screen w-full py-5">
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
                              <Button
                                  variant="destructive"
                                  size="icon"
                                  aria-label="click to delete note"
                                  onClick={() => deleteData(note.id)}
                              >
                                  <Trash size={15} />
                              </Button>
                              <UpdateNote setCurrentNotes={setCurrentNotes} id={note.id} />
                          </div>
                      ))
                    : ""}
            </section>
        </section>
    );
}
