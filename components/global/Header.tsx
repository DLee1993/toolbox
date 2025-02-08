import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Header() {
    return (
        <header className="p-2 sticky top-0 md:hidden">
            <SidebarTrigger variant="outline" className="md:hidden w-10 h-10" />
        </header>
    );
}
