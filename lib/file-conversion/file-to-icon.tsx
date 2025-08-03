/* eslint-disable @typescript-eslint/no-explicit-any */
import { FileImage, Film, Speaker, Ear, Shapes } from "lucide-react";

export default function fileToIcon(file_type: any): any {
    if (file_type.includes("video")) return <Film size={20} />;
    if (file_type.includes("audio")) return <Speaker size={20} />;
    if (file_type.includes("text")) return <Ear size={20} />;
    if (file_type.includes("image")) return <FileImage size={20} />;
    else return <Shapes size={20} />;
}
