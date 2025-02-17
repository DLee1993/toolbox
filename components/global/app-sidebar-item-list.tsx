import {
    Key,
    Combine,
    Clock,
    Notebook,
    Network,
    Unlink,
    Home,
    FolderGit2,
    CoffeeIcon,
} from "lucide-react";

export const sidebarItems = [
    {
        category: "Dashboard",
        items: [
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
        ],
    },
    {
        category: "Tools",
        items: [
            {
                title: "Credentials",
                url: "/credentials-generator",
                icon: Key,
            },
            {
                title: "File converter",
                url: "/file-converter",
                icon: Combine,
            },
            {
                title: "Focus timer",
                url: "/focus-timer",
                icon: Clock,
            },
            {
                title: "Notepad",
                url: "/notepad",
                icon: Notebook,
            },
            {
                title: "Link in bio",
                url: "/link-in-bio",
                icon: Network,
            },
            {
                title: "Link shortener",
                url: "/link-shortener",
                icon: Unlink,
            },
        ],
    },
];
