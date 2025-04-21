import { CopyrightIcon } from "lucide-react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa6";

export default function Footer() {
    return (
        <footer className="flex justify-between items-center border-t-2 border-muted">
            <p className="flex items-center gap-1 text-muted-foreground text-sm">
                Toolbox <CopyrightIcon size={15} /> 2025
            </p>
            <ul>
                <li>
                    <Link href="https://github.com/DLee1993/toolbox" target="_blank">
                        <span className="sr-only">project repository</span>
                        <FaGithub size={20} />
                    </Link>
                </li>
            </ul>
        </footer>
    );
}
