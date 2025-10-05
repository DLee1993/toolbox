export const HelpProviderContentList = [
    {
        url: "/tools/credentials-generator",
        question: "What is a credentials generator?",
        description:
            "You can generate secure credentials in seconds — choose between strong passwords and numeric PINs. PINs are short, digit-only codes. Our passwords are complex, combining:",
        points: [
            { text: "Letters", subText: "(A-Z, a-z)" },
            { text: "Numbers", subText: "(0-9)" },
            { text: "Symbols", subText: "(@, #, $, %, &, *)" },
        ],
        guide: {
            question: "How do I use it?",
            points: [
                { text: "Select your type", subText: "(Password or Pin)" },
                { text: "Select the length", subText: "(password: 8-30, pin: 4-16)" },
                { text: "Click Generate Credential", subText: "" },
                { text: "Copy to clipboard and use where you want", subText: "" },
            ],
        },
    },
    {
        url: "/tools/file-converter",
        question: "What is a file converter?",
        description:
            "A fast and easy tool for converting audio, video, and image files between popular formats. No editing, no tweaking—just clean, reliable format conversion.",
        points: [
            { text: "Audio", subText: "(MP3, WAV, AAC, FLAC, and more)" },
            { text: "Video", subText: "(MP4, AVI, MOV, MKV, and more)" },
            { text: "Images", subText: "(JPG, PNG, GIF, BMP, and more)" },
        ],
        guide: {
            question: "How do I use it?",
            points: [
                { text: "Add your files", subText: "(Image, Video or Audio)" },
                { text: "Select the type you want convert to", subText: "" },
                { text: "Click the convert button", subText: "" },
                {
                    text: "Then click either the download all or three dots to download individually",
                    subText: "",
                },
            ],
        },
    },
    {
        url: "/tools/unit-converter",
        question: "What is a unit converter?",
        description:
            "Convert Currency and Measurements with ease — switch between global currencies, metric and imperial units.",
        points: [
            { text: "Currency", subText: "(160+ currencies)" },
            { text: "Lengths", subText: "(Inches, centimeters, meters, feet, miles, and more)" },
            { text: "Weight", subText: "(Grams, kilograms, pounds, ounces)" },
            { text: "Temperature", subText: "(Celsius, Fahrenheit, Kelvin)" },
            { text: "Volume", subText: "(Litres, gallons, cups, millilitres)" },
        ],
        guide: {
            question: "How do I use it?",
            points: [
                { text: "Select your type", subText: "(Measurements or Currency)" },
                { text: "Select the units to convert", subText: "(mm-cm, celsius-kelvin, dollars-pounds)" },
                { text: "Add the amount you want to convert", subText: "" },
                { text: "Click convert", subText: "" },
            ],
        },
    },
];
