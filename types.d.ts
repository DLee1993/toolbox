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
    completedBy: Date | undefined;
    id: string;
    createdAt: string;
    completed: boolean;
};

type Action = {
    file: File;
    file_name: string;
    file_size: number;
    from: string;
    to: string | null;
    file_type: string;
    is_converting?: boolean;
    is_converted?: boolean;
    is_error?: boolean;
    url?: string;
    output?: string;
};
