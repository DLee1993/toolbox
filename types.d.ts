type LinkInBioValues = {
    name?: string;
    email?: string;
    description?: string;
    photo?: string;
    portfolio?: string;
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    github?: string;
    telegram?: string;
    youtube?: string;
    whatsApp?: string;
    [key: string]: string;
};

type NotepadNoteValues = {
    title: string;
    content?: string;
    category?: string;
    id: string;
    createdAt: string;
    updatedAt: string;
};

type NotepadCategoryValues = {
    categoryName: string;
};
