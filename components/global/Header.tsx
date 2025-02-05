import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Header() {
    return (
        <header className="p-5 md:hidden">
            <SidebarTrigger className="md:hidden" />
        </header>
    );
}
