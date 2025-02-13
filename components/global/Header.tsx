import { SidebarTrigger } from "@/components/ui/sidebar";
import BreadCrumbNav from "./BreadCrumbNav";
import ChangeTheme from "./ThemeToggle";
import { Button } from "../ui/button";
import Link from "next/link";
import { StarIcon } from "lucide-react";

export default function Header() {
    return (
        <header className="sticky top-0 z-10 min-h-14 flex justify-between items-center bg-background border-b-2 border-muted px-2 sm:px-5 md:px-7">
            <div className="flex items-center gap-2">
                <SidebarTrigger variant="ghost" className="md:hidden w-10 h-10" />
                <div className="hidden min-[600px]:block">
                    <BreadCrumbNav />
                </div>
            </div>
            <div className="flex gap-4 w-fit">
                <Link
                    href="https://github.com/DLee1993"
                    target="_blank"
                    className="hidden min-[600px]:block"
                >
                    <Button variant="outline">
                        <StarIcon /> support us
                    </Button>
                </Link>
                <Link
                    href="https://github.com/DLee1993"
                    target="_blank"
                    className="hidden min-[600px]:block"
                >
                    <Button variant="outline">Request a tool</Button>
                </Link>
                <ChangeTheme />
            </div>
        </header>
    );
}
