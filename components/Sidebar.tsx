"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Key, Combine, Square } from "lucide-react";
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
import ChangeTheme from "./ThemeToggle";

const items = [
    {
        type: "Tools",
        pages: [
            {
                title: "Password generator",
                url: "/password-generator",
                icon: Key,
            },
            {
                title: "File converter",
                url: "/file-converter",
                icon: Combine,
            },
        ],
    },
    {
        type: "Docs",
        pages: [
            {
                title: "React Cheatsheet",
                url: "/password-generator",
            },
            {
                title: "Next.js Cheatsheet",
                url: "/file-converter",
            },
        ],
    },
];

export function AppSidebar() {
    const pathname = usePathname();
    const { open } = useSidebar();

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="overflow-hidden">
                <div className="relative hidden md:flex justify-end items-center space-x-2">
                    <SidebarTrigger className="w-full max-w-8 z-10" />
                    <p
                        className={`absolute top-1/2 -translate-y-1/2 left-0 z-0 text-lg font-semibold transition-transform ease-linear ${
                            open ? "opacity-100 delay-100" : "opacity-0 translate-y-1"
                        }`}
                    >
                        MonoLayer
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
                                    className="space-x-2 text-base"
                                    isActive={pathname === "/" ? true : false}
                                >
                                    <Link href="/">
                                        <Home size={16} />
                                        <p className="min-w-52">Home</p>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroup>

                    {items.map((group, index) => (
                        <SidebarGroup key={index}>
                            <SidebarGroupLabel>{group.type}</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {group.pages.map((item, index) => (
                                        <SidebarMenuItem key={index}>
                                            <SidebarMenuButton
                                                asChild
                                                tooltip={item.title}
                                                className="space-x-2 text-base"
                                                isActive={pathname === item.url ? true : false}
                                            >
                                                <Link href={item.url}>
                                                    {"icon" in item ? (
                                                        <item.icon size={16} />
                                                    ) : (
                                                        <Square size={16}/>
                                                    )}
                                                    <p className="min-w-52">{item.title}</p>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    ))}
                </SidebarGroupContent>
                <SidebarSeparator />
                <SidebarGroup className="mt-auto">
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <ChangeTheme />
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
