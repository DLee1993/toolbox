"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";
import { Dot, Home, FolderGit2 } from "lucide-react";
import { sidebarItems } from "@/components/global/navigation/app-sidebar-item-list";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
    useSidebar,
    SidebarTrigger,
} from "@/components/ui/sidebar";

export function AppSidebar() {
    const pathname = usePathname();
    const { open, setOpen, isMobile, setOpenMobile } = useSidebar();

    const closeSidebar = () => {
        setOpen(false);
        setOpenMobile(false);
    };

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="overflow-hidden px-3 md:my-1">
                <div className="relative hidden md:block">
                    <SidebarTrigger className="absolute top-1/2 -translate-y-1/2 -right-1.5 min-w-9 min-h-9 z-10 cursor-pointer" />

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
            {/* SIDEBAR CONTENT */}
            <SidebarContent
                className={`overflow-x-hidden px-[5px] py-1 ${
                    open ? "overflow-y-auto" : "!overflow-y-auto hiddenScrollbar"
                }`}
            >
                <SidebarGroup key={`Dashboard menu group`}>
                    <SidebarGroupLabel className="pointer-events-none">Dashboard</SidebarGroupLabel>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                asChild
                                tooltip="Dashboard"
                                isActive={pathname === "/" ? true : false}
                                onClick={closeSidebar}
                                className="min-h-9 min-w-9 hover:bg-muted"
                            >
                                <Link href="/" className="data-[active=true]:bg-secondary">
                                    <Home size={15} className="ml-0.5" />
                                    <p
                                        className={`mx-2 min-w-32 transition-opacity duration-200 ease-linear ${
                                            !open && !isMobile && "opacity-0"
                                        }`}
                                    >
                                        Dashboard
                                    </p>
                                    {pathname === "/" && <Dot className="ml-auto" />}
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                asChild
                                tooltip="Request a tool"
                                onClick={closeSidebar}
                                className="min-h-9 min-w-9 hover:bg-muted"
                            >
                                <Link href="https://github.com/DLee1993/toolbox" target="_blank">
                                    <FolderGit2 size={15} className="ml-0.5" />
                                    <p
                                        className={`mx-2 min-w-32 transition-opacity duration-200 ease-linear ${
                                            !open && !isMobile && "opacity-0"
                                        }`}
                                    >
                                        Request a tool
                                    </p>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
                <SidebarSeparator className="bg-border my-1" />
                {sidebarItems.map((group) => (
                    <SidebarGroup key={`${group.title} menu group`}>
                        <SidebarGroupLabel className="pointer-events-none">
                            {group.title}
                        </SidebarGroupLabel>
                        <SidebarMenu>
                            {group.items.map((item, i) => (
                                <SidebarMenuItem key={`menu-item-${i}`}>
                                    <SidebarMenuButton
                                        asChild
                                        tooltip={item.title}
                                        isActive={pathname === item.url ? true : false}
                                        onClick={closeSidebar}
                                        className="min-h-9 min-w-9 hover:bg-muted"
                                    >
                                        <Link href={item.url}>
                                            {item.icon && (
                                                <item.icon size={15} className="ml-0.5" />
                                            )}
                                            <p
                                                className={`flex gap-1 min-w-44 ml-1 transition-opacity duration-200 ease-linear ${
                                                    !open && !isMobile && "opacity-0"
                                                }`}
                                            >
                                                {item.title}
                                                {pathname === item.url && <Dot className="ml-auto"/>}
                                            </p>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroup>
                ))}
            </SidebarContent>
        </Sidebar>
    );
}
