import {
    Key,
    Combine,
    Clock,
    Notebook,
    Network,
    Unlink,
} from "lucide-react";

export const items = [
    {
        type: "Tools",
        pages: [
            {
                title: "Password generator",
                url: "/PasswordGenerator",
                icon: Key,
            },
            {
                title: "File converter",
                url: "/FileConverter",
                icon: Combine,
            },
            {
                title: "Focus timer",
                url: "/FocusTimer",
                icon: Clock,
            },
            {
                title: "Notepad",
                url: "/Notepad",
                icon: Notebook,
            },
            {
                title: "Link in bio",
                url: "/LinkInBio",
                icon: Network,
            },
            {
                title: "Link shortener",
                url: "/URLShortener",
                icon: Unlink,
            },
        ],
    },
];
