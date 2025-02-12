import { SidebarTrigger } from "@/components/ui/sidebar";
import BreadCrumbNav from "./BreadCrumbNav";
import ChangeTheme from "./ThemeToggle";

export default function Header() {
    return (
        <header className="customPadding sticky top-0 z-10 flex justify-between items-center bg-background">
            <div className="flex items-center gap-4">
                <SidebarTrigger variant="ghost" className="md:hidden w-10 h-10" />
                <BreadCrumbNav />
            </div>
            <ChangeTheme />
        </header>
    );
}
