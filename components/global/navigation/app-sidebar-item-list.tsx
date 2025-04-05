import {
    Key,
    Combine,
    Clock,
    Notebook,
    Network,
    ArrowLeftRight,
    Binary,
    Map,
    DollarSign,
    QrCode,
} from "lucide-react";

//! DO NOT REMOVE
export const sidebarItems = [
    {
        title: "Security",
        items: [
            {
                title: "Passwords",
                url: "/tools/password-generator",
                icon: Key,
                description: "Generate strong and secure passwords.",
            },
            {
                title: "Pin numbers",
                url: "/tools/pin-generator",
                icon: Binary,
                description: "Generate PIN codes.",
            },
        ],
    },
    {
        title: "Conversion",
        items: [
            {
                title: "Files",
                url: "/tools/file-converter",
                icon: Combine,
                description: "Convert files between different formats.",
            },
            {
                title: "Currency",
                url: "/tools/currency-converter",
                icon: DollarSign,
                description: "Convert between different currencies.",
            },
            {
                title: "Units",
                url: "/tools/unit-converter",
                icon: ArrowLeftRight,
                description: "Convert units of measurement.",
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
                description: "Stay focused and manage your time effectively.",
            },
            {
                title: "Timezones",
                url: "/tools/timezones",
                icon: Map,
                description: "Check what time it is, anywhere in the world.",
            },
            {
                title: "Notepad",
                url: "/tools/notepad",
                icon: Notebook,
                description: "Write and save notes easily.",
            },
        ],
    },
    {
        title: "Networking",
        items: [
            {
                title: "Link in bio",
                url: "/tools/link-in-bio",
                icon: Network,
                description: "Create a personalized landing page for your links.",
            },
            {
                title: "QR code generator",
                url: "/tools/qr-code-generator",
                icon: QrCode,
                description: "Generate QR codes for any URL.",

            }
        ],
    },
];
