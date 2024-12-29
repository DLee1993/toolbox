import Link from "next/link";
import { Button } from "./ui/button";
import { SidebarTrigger } from "./ui/sidebar";

export default function Header() {
    return (
        <header className="px-2 flex justify-between md:justify-end items-center">
            <SidebarTrigger className="md:hidden" />
            <Button variant="link">
                <Link href="https://github.com" target="_blank">
                    Project repo
                </Link>
            </Button>
        </header>
    );
}
