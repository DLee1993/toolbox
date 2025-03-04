import BreadCrumbNav from "@/components/global/navigation/BreadCrumbNav";
import ChangeTheme from "@/components/global/ThemeToggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Header() {
    return (
        <header className="sticky top-0 z-10 min-h-14 flex justify-between items-center bg-background border border-border px-6">
            <BreadCrumbNav />
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
