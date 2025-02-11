import { Key, Combine, Clock, Notebook, Network, Unlink } from "lucide-react";

export const sidebarItems = [
    {
        category: "Security",
        tools: [
            {
                title: "Credentials",
                url: "/credentials-generator",
                icon: Key,
            },
        ],
    },
    {
        category: "Productivity",
        tools: [
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
        ],
    },
    {
        category: "Networking",
        tools: [
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
