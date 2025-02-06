import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Header() {
    return (
        <header className="p-2 md:hidden">
            <SidebarTrigger className="md:hidden w-10 h-10" />
        </header>
    );
}
