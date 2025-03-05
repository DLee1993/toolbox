"use client";

import { useEffect, useState } from "react";
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

type BreadCrumb = {
    title: string;
    url: string;
    icon: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
};

export default function BreadCrumbNav() {
    const path = usePathname();
    const slug = path.split("/")[1]; // this is the category in the menu i.e. tools, documents etc
    const [currentBreadCrumbs, setCurrentBreadCrumbs] = useState<BreadCrumb[]>([]);

    useEffect(() => {
        const itemArray = sidebarSubItems.filter(
            (sidebarSubItems) => sidebarSubItems.title.toLowerCase() === slug
        )[0];

        if (!itemArray) return;

        const items = itemArray.items.filter((item) => item.url !== path);

        setCurrentBreadCrumbs(items);
    }, [slug, path]);

    return (
        <Breadcrumb suppressHydrationWarning>
            {path != "/" && currentBreadCrumbs.length > 0 ? (
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center gap-1">
                                Tools
                                <span className="sr-only">Toggle menu</span>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start">
                                {currentBreadCrumbs.map((item, i) => (
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
                        <BreadcrumbPage>{path.split("/")[2]}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            ) : (
                <BreadcrumbList>
                    {path !== "/" && (
                        <>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                        </>
                    )}
                    <BreadcrumbItem>
                        <BreadcrumbPage>{path.split("/")[2]}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            )}
        </Breadcrumb>
    );
}
