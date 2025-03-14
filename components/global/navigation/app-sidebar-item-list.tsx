import {
    Key,
    Combine,
    Clock,
    Notebook,
    Network,
    Unlink,
    SquareTerminal,
    Home,
    FolderGit2,
    CoffeeIcon,
    MegaphoneIcon,
} from "lucide-react";

//! DO NOT REMOVE
export const sidebarRootItems = [
    {
        title: "Home",
        url: "/",
        icon: Home,
        target: false,
    },
    {
        title: "Request a tool",
        url: "https://github.com/DLee1993",
        icon: FolderGit2,
        target: true,
    },
    {
        title: "Buy us a coffee",
        url: "https://github.com/DLee1993",
        icon: CoffeeIcon,
        target: true,
    },
    {
        title: "Advertisements",
        url: "https://www.google.com",
        icon: MegaphoneIcon,
        target: true,
    },
];

//? - ADD NEW ADDITIONS TO APP HERE

export const sidebarSubItems = [
    {
        title: "Tools",
        icon: SquareTerminal,
        items: [
            {
                title: "Credentials",
                url: "/tools/credentials-generator",
                icon: Key,
            },
            {
                title: "File converter",
                url: "/tools/file-converter",
                icon: Combine,
            },
            {
                title: "Focus timer",
                url: "/tools/focus-timer",
                icon: Clock,
            },
            {
                title: "Notepad",
                url: "/tools/notepad",
                icon: Notebook,
            },
            {
                title: "Link in bio",
                url: "/tools/link-in-bio",
                icon: Network,
            },
            {
                title: "Link shortener",
                url: "/tools/link-shortener",
                icon: Unlink,
            },
        ],
    },
];
