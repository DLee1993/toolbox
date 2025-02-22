"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";
import { Library } from "lucide-react";
import { sidebarItems } from "./app-sidebar-item-list";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
    SidebarTrigger,
    useSidebar,
} from "../ui/sidebar";

export function AppSidebar() {
    const pathname = usePathname();
    const { open, setOpen } = useSidebar();

    const closeSidebar = () => {
        if (!open) return;
        setOpen(!open);
    };

    return (
        <Sidebar variant="inset" collapsible="icon" className="border-r-2 border-muted z-50 px-0">
            <SidebarHeader className="overflow-hidden px-0">
                <div className="relative hidden md:block px-4">
                    <SidebarTrigger
                        className="absolute top-1/2 -translate-y-1/2 right-2.5 w-full max-w-10 h-10 z-10 cursor-pointer"
                        type="button"
                        variant="ghost"
                    />
                    <p
                        className={`flex flex-col min-w-52 transition-opacity duration-200 ease-linear text-sm ${
                            !open && "opacity-0"
                        }`}
                    >
                        Toolbox
                        <span className="text-xs text-muted-foreground font-normal">
                            A hub for essential tools.
                        </span>
                    </p>
                </div>
            </SidebarHeader>
            <SidebarContent
                className={`overflow-x-hidden ${
                    open ? "overflow-y-auto" : "!overflow-y-auto hiddenScrollbar"
                }`}
            >
                {sidebarItems.map((item, index) => (
                    <React.Fragment key={`SidebarGroup-${index}`}>
                        {index !== 0 && <SidebarSeparator className="hidden md:block" />}
                        <SidebarGroup>
                            <SidebarGroupLabel className="pointer-events-none">
                                {item.category}
                            </SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {item.items.map((sidebarItem, index) => (
                                        <SidebarMenuItem key={`SidebarItem-${index}`}>
                                            <SidebarMenuButton
                                                asChild
                                                tooltip={sidebarItem.title}
                                                className="ml-[0.0655rem] space-x-2 min-h-10 min-w-10 text-muted-foreground hover:bg-muted/50"
                                                isActive={
                                                    pathname === sidebarItem.url ? true : false
                                                }
                                                onClick={closeSidebar}
                                            >
                                                <Link href={sidebarItem.url}>
                                                    {"icon" in sidebarItem ? (
                                                        <sidebarItem.icon
                                                            className="ml-1"
                                                            size={15}
                                                        />
                                                    ) : (
                                                        <Library className="ml-1" />
                                                    )}
                                                    <p className="min-w-52">{sidebarItem.title}</p>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </React.Fragment>
                ))}
            </SidebarContent>
        </Sidebar>
    );
}
