"use client";

import { usePathname } from "next/navigation";
import { sidebarSubItems } from "@/components/global/navigation/app-sidebar-item-list";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function BreadCrumbNav() {
    const path = usePathname();
    const tools = sidebarSubItems
        .filter((sidebarSubItems) => sidebarSubItems.title === "Tools")[0]
        .items.filter((item) => item.url !== path);

    return (
        <Breadcrumb>
            {path != "/" && (
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center gap-1">
                                Tools
                                <span className="sr-only">Toggle menu</span>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start">
                                {tools.map((item, i) => (
                                    <DropdownMenuItem key={i} className="p-0 transition-none">
                                        <BreadcrumbLink
                                            href={item.url}
                                            className="inline-block w-full h-full px-2 py-1.5 transition-none"
                                        >
                                            {item.title}
                                        </BreadcrumbLink>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{path.slice(1)}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            )}
        </Breadcrumb>
    );
}
