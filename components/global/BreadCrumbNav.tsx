"use client";

import { usePathname } from "next/navigation";
import { sidebarItems } from "./app-sidebar-item-list";
import {
    Breadcrumb,
    BreadcrumbEllipsis,
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
    const tools = sidebarItems
        .filter((sidebarItems) => sidebarItems.category === "Tools")[0]
        .items.filter((item) => item.url !== path);

    return (
        <Breadcrumb>
            {path != "/" && (
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center gap-1">
                                <BreadcrumbEllipsis className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start">
                                {tools.map((item, i) => (
                                    <DropdownMenuItem key={i} className="p-0 transition-none">
                                        <BreadcrumbLink href={item.url} className="inline-block w-full h-full px-2 py-1.5 bg-transparent hover:text-background transition-none">
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
