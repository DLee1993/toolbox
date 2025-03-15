import { Key, Combine, Clock, Notebook, Network, Unlink } from "lucide-react";

//! DO NOT REMOVE
export const sidebarItems = [
    {
        title: "Tools",
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
