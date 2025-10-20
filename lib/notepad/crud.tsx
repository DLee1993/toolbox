import { isWindowDefined } from "@/lib/utils";

function saveNotes(notes: NotepadNoteValues) {
    localStorage.setItem("notepad-notes", JSON.stringify(notes));
}

function checkIfExists(title: string, id: string) {
    const notes = getAllNotes();

    if (
        notes.some(
            (note: NotepadNoteValues) =>
                note.title.toLowerCase() === title.toLowerCase() && note.id !== id
        )
    ) {
        return true;
    } else {
        return false;
    }
}

export const getAllCategories = () => {
    if (isWindowDefined()) {
        const storedCategories = localStorage.getItem("notepad-categories");
        return storedCategories
            ? JSON.parse(storedCategories)
            : [
                  "Homework",
                  "Work",
                  "Personal",
                  "Ideas",
                  "Reminders",
                  "Shopping",
                  "Fitness",
                  "Travel",
                  "Finance",
                  "Health",
                  "Events",
                  "Books",
                  "Movies",
                  "Recipes",
                  "Goals",
              ];
    }
    return [];
};

export const getAllNotes = () => {
    if (isWindowDefined()) {
        const storedNotes = localStorage.getItem("notepad-notes");
        return storedNotes ? JSON.parse(storedNotes) : [];
    }
    return [];
};

export const addNote = (note: NotepadNoteValues) => {
    const currentNotes = getAllNotes();

    const duplicate = checkIfExists(note.title, note.id);

    if (duplicate) {
        return { duplicate, currentNotes };
    } else {
        const newNote = {
            id: note.id,
            title: note.title,
            content: note.content,
            category: note.category,
            completedBy: note.completedBy,
            createdAt: note.createdAt,
            completed: note.completed,
        };
        currentNotes.push(newNote);
        saveNotes(currentNotes);

        return { duplicate, currentNotes };
    }
};

export const updateNote = (note: NotepadNoteValues) => {
    let existingData = getAllNotes();

    const duplicate = checkIfExists(note.title, note.id);

    if (duplicate) {
        return { duplicate, existingData };
    } else {
        existingData = existingData.map((item: NotepadNoteValues) =>
            item.id === note.id ? { ...item, ...note } : item
        );

        saveNotes(existingData);

        return { duplicate, existingData };
    }
};

export const deleteNote = (id: string) => {
    let existingData = getAllNotes();

    existingData = existingData.filter((item: NotepadNoteValues) => item.id !== id);

    saveNotes(existingData);

    return existingData;
};
