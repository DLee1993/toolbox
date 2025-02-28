import { SidebarTrigger } from "@/components/ui/sidebar";
import BreadCrumbNav from "@/components/global/navigation/BreadCrumbNav";
import ChangeTheme from "@/components/global/ThemeToggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Header() {
    return (
        <header className="sticky top-0 z-10 min-h-14 flex justify-between items-center bg-background border-b-2 border-muted px-2">
            <div className="flex items-center gap-2">
                <SidebarTrigger variant="ghost" className="w-10 h-10" />
                <BreadCrumbNav />
            </div>
            <div className="flex items-center gap-2 w-fit">
                <div className="hidden md:block">
                    <Link href="/advertisements">
                        <Button variant="link">Advertisements</Button>
                    </Link>
                </div>
                <ChangeTheme />
            </div>
        </header>
    );
}
