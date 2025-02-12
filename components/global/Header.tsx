import { SidebarTrigger } from "@/components/ui/sidebar";
import BreadCrumbNav from "./BreadCrumbNav";
import ChangeTheme from "./ThemeToggle";

export default function Header() {
    return (
        <header className="sticky top-0 z-10 min-h-20 flex justify-between items-center bg-background border-b-2 border-muted px-2 sm:px-5 md:px-7 lg:px-10">
            <div className="flex items-center gap-2">
                <SidebarTrigger variant="ghost" className="md:hidden w-10 h-10" />
                <BreadCrumbNav />
            </div>
            <ChangeTheme />
        </header>
    );
}
