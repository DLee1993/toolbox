import { SidebarTrigger } from "./ui/sidebar";

export default function Header() {
    return (
        <header className="py-[8px] px-2 md:hidden">
            <SidebarTrigger />
        </header>
    );
}
