"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { sidebarItems } from "@/components/global/navigation/app-sidebar-item-list";
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
        const filteredBreadcrumbs = sidebarItems.flatMap((obj) =>
            obj.items.filter((innerObj) => innerObj.url !== path)
        );

        setCurrentBreadCrumbs(filteredBreadcrumbs);
    }, [path]);

    return (
        <Breadcrumb suppressHydrationWarning>
            {path != "/" && (
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center gap-1 capitalize">
                                {slug}
                                <span className="sr-only">Toggle menu</span>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start">
                                {currentBreadCrumbs.map((item, i) => (
                                    <DropdownMenuItem
                                        key={i}
                                        className="p-0 transition-none capitalize"
                                    >
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
                        <BreadcrumbPage className="capitalize">
                            {path.split("/")[2].split("-").join(" ")}{" "}
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            )}
        </Breadcrumb>
    );
}
