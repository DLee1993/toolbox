import { SidebarTrigger } from "@/components/ui/sidebar";
import BreadCrumbNav from "./BreadCrumbNav";
import ChangeTheme from "./ThemeToggle";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Header() {
    return (
        <header className="sticky top-0 z-10 min-h-14 flex justify-between items-center border-b-2 border-muted px-2 sm:px-5 md:px-7">
            <div className="flex items-center gap-2">
                <SidebarTrigger variant="ghost" className="md:hidden w-10 h-10" />
                <div className="hidden min-[850px]:block">
                    <BreadCrumbNav />
                </div>
            </div>
            <div className="flex gap-2 w-fit">
                <Link href="/advertisements">
                    <Button variant="link">Advertisements</Button>
                </Link>
                <ChangeTheme />
            </div>
        </header>
    );
}
