import BreadCrumbNav from "@/components/global/navigation/BreadCrumbNav";
import ChangeTheme from "@/components/global/ThemeToggle";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Header() {
    return (
        <header className="sticky top-0 z-10 flex justify-between items-center bg-background border border-border px-2 sm:px-4 md:px-6">
            <div className="flex items-center gap-2">
                <SidebarTrigger variant="ghost" className="w-10 h-10 md:hidden" />
                <BreadCrumbNav />
            </div>
            <ChangeTheme />
        </header>
    );
}
