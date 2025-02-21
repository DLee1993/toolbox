import { CopyrightIcon } from "lucide-react";

export default function Footer() {
    return (
        <footer className="min-h-16 flex justify-center items-center border-t-2 border-sidebar-border/50">
            <p className="flex items-center gap-1 text-muted-foreground">
                Toolbox <CopyrightIcon size={15} /> 2025
            </p>
        </footer>
    );
}
