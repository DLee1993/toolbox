import { Key, Combine, Clock, Notebook, Unlink, ArrowLeftRight, Binary } from "lucide-react";

//! DO NOT REMOVE
export const sidebarItems = [
    {
        title: "Security",
        items: [
            {
                title: "Password generator",
                url: "/tools/password-generator",
                icon: Key,
            },
            {
                title: "Pin generator",
                url: "/tools/pin-generator",
                icon: Binary,
            },
        ],
    },
    {
        title: "Conversion",
        items: [
            {
                title: "File converter",
                url: "/tools/file-converter",
                icon: Combine,
            },
            {
                title: "Unit converter",
                url: "/tools/unit-converter",
                icon: ArrowLeftRight,
            },
        ],
    },
    {
        title: "Productivity",
        items: [
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
        ],
    },
    {
        title: "Networking",
        items: [
            {
                title: "Link shortener",
                url: "/tools/link-shortener",
                icon: Unlink,
            },
        ],
    },
];
