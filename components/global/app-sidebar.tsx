"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ChangeTheme from "../theme/ThemeToggle";
import { Home, Library, FolderGit2 } from "lucide-react";
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
} from "@/components/ui/sidebar";
import { items } from "./app-sidebar-item-list";

export function AppSidebar() {
    const pathname = usePathname();
    const { open } = useSidebar();

    return (
        <Sidebar collapsible="icon" variant="floating">
            <SidebarHeader className="overflow-hidden px-1 py-2">
                <div className="relative hidden md:flex justify-end items-center space-x-2">
                    <SidebarTrigger
                        className="w-full max-w-10 h-10 z-10 hover:bg-sidebar-accent cursor-pointer"
                        type="button"
                    />
                    <p
                        className={`flex flex-col min-w-52 absolute top-1/2 -translate-y-1/2 left-0 z-0 ml-2 transition-transform ease-linear ${
                            !open && "opacity-0"
                        }`}
                    >
                        Toolbox
                        <span className="text-xs text-muted-foreground font-normal">A hub for essential tools.</span>
                    </p>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroupContent
                    className={open ? "overflow-y-auto" : "overflow-y-auto hiddenScrollbar"}
                >
                    <SidebarGroup>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    tooltip="Home"
                                    className="space-x-2 min-h-10 min-w-10"
                                    isActive={pathname === "/" ? true : false}
                                >
                                    <Link href="/">
                                        <Home className="ml-1" />
                                        <p className="min-w-52">Home</p>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    tooltip="Request a tool"
                                    className="space-x-2 min-h-10 min-w-10"
                                >
                                    <Link href="https://github.com/DLee1993" target="_blank">
                                        <FolderGit2 className="ml-1" />
                                        <p className="min-w-52">Request a tool</p>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <ChangeTheme />
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroup>
                    {items.map((group, index) => (
                        <section key={`Items-group: ${index}`}>
                            <SidebarSeparator />
                            <SidebarGroup className="overflow-hidden">
                                <SidebarGroupLabel className="z-0">{group.type}</SidebarGroupLabel>
                                <SidebarGroupContent>
                                    <SidebarMenu>
                                        {group.pages.map((item, index) => (
                                            <SidebarMenuItem key={index}>
                                                <SidebarMenuButton
                                                    asChild
                                                    tooltip={item.title}
                                                    className="space-x-2 min-h-10 min-w-10"
                                                    isActive={pathname === item.url ? true : false}
                                                >
                                                    <Link href={item.url}>
                                                        {"icon" in item ? (
                                                            <item.icon size={15} className="ml-1" />
                                                        ) : (
                                                            <Library size={15} className="ml-1" />
                                                        )}
                                                        <p className="min-w-52">{item.title}</p>
                                                    </Link>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        ))}
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </SidebarGroup>
                        </section>
                    ))}
                </SidebarGroupContent>
            </SidebarContent>
        </Sidebar>
    );
}
