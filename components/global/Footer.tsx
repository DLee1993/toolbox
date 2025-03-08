import { CopyrightIcon } from "lucide-react";

export default function Footer() {
    return (
        <footer className="flex justify-center items-center border-t-2 border-muted">
            <p className="flex items-center gap-1 text-muted-foreground">
                Toolbox <CopyrightIcon size={15} /> 2025
            </p>
        </footer>
    );
}
