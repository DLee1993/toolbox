"use client";

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

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Library, FolderGit2, CoffeeIcon, MegaphoneIcon } from "lucide-react";
import { sidebarItems } from "./app-sidebar-item-list";

export function AppSidebar() {
    const pathname = usePathname();
    const { open } = useSidebar();

    return (
        <Sidebar variant="inset" collapsible="icon" className="border-r-2 border-muted z-50 px-0">
            <SidebarHeader className="overflow-hidden px-0">
                <div className="relative hidden md:flex justify-end items-center space-x-2 px-0">
                    <SidebarTrigger
                        className="absolute top-1/2 -translate-y-1/2 right-1 w-full max-w-10 h-10 z-10 cursor-pointer hover:bg-muted"
                        type="button"
                        variant="ghost"
                    />
                    <p
                        className={`flex flex-col min-w-52 transition-opacity duration-300 ease-linear text-sm ${
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
            <SidebarContent className="mt-2">
                <SidebarGroup>
                    <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
                    <SidebarGroupContent
                        className={open ? "overflow-y-auto" : "overflow-y-auto hiddenScrollbar"}
                    >
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    tooltip="Home"
                                    className="space-x-2 min-h-10 min-w-10 text-muted-foreground hover:text-foreground"
                                    isActive={pathname === "/" ? true : false}
                                >
                                    <Link href="/">
                                        <Home className="ml-1" />
                                        <p className="min-w-52">Home</p>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <div className="block  min-[600px]:hidden">
                                <SidebarMenuItem>
                                    <SidebarMenuButton
                                        asChild
                                        tooltip="Request a tool"
                                        className="space-x-2 min-h-10 min-w-10 text-muted-foreground hover:text-foreground"
                                    >
                                        <Link href="https://github.com/DLee1993" target="_blank">
                                            <FolderGit2 className="ml-1" />
                                            <p className="min-w-52">Request a tool</p>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton
                                        asChild
                                        tooltip="Support us"
                                        className="space-x-2 min-h-10 min-w-10 text-muted-foreground hover:text-foreground"
                                    >
                                        <Link href="https://github.com/DLee1993" target="_blank">
                                            <CoffeeIcon className="ml-1" />
                                            <p className="min-w-52">Buy us a coffee</p>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton
                                        asChild
                                        tooltip="Advertisements"
                                        className="space-x-2 min-h-10 min-w-10 text-muted-foreground hover:text-foreground"
                                    >
                                        <Link href="/advertisements">
                                            <MegaphoneIcon className="ml-1" />
                                            <p className="min-w-52">Advertisements</p>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </div>
                        </SidebarMenu>
                    </SidebarGroupContent>
                    {sidebarItems.map((group, index) => (
                        <section key={`Items-group: ${index}`}>
                            <SidebarSeparator className="mt-2.5" />
                            <SidebarGroup className="overflow-hidden px-0">
                                <SidebarGroupContent key={index}>
                                    <SidebarGroupLabel className="z-0">
                                        {group.category}
                                    </SidebarGroupLabel>
                                    <SidebarMenu>
                                        {group.tools.map((tool, index) => (
                                            <SidebarMenuItem key={index}>
                                                <SidebarMenuButton
                                                    asChild
                                                    tooltip={tool.title}
                                                    className="space-x-2 min-h-10 min-w-10 text-muted-foreground hover:text-foreground"
                                                    isActive={pathname === tool.url ? true : false}
                                                >
                                                    <Link href={tool.url}>
                                                        {"icon" in tool ? (
                                                            <tool.icon className="ml-1" size={15} />
                                                        ) : (
                                                            <Library className="ml-1" />
                                                        )}
                                                        <p className="min-w-52">{tool.title}</p>
                                                    </Link>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        ))}
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </SidebarGroup>
                        </section>
                    ))}
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
