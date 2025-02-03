"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Home,
    Key,
    Combine,
    Library,
    Clock,
    Notebook,
    Network,
    FolderGit2,
    Unlink,
} from "lucide-react";
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
import ChangeTheme from "../theme/ThemeToggle";

const items = [
    {
        type: "Tools",
        pages: [
            {
                title: "Password generator",
                url: "/PasswordGenerator",
                icon: Key,
            },
            {
                title: "File converter",
                url: "/FileConverter",
                icon: Combine,
            },
            {
                title: "Focus timer",
                url: "/FocusTimer",
                icon: Clock,
            },
            {
                title: "Notepad",
                url: "/Notepad",
                icon: Notebook,
            },
            {
                title: "Link in bio",
                url: "/LinkInBio",
                icon: Network,
            },
            {
                title: "Link shortener",
                url: "/URLShortener",
                icon: Unlink,
            },
        ],
    },
];

export function AppSidebar() {
    const pathname = usePathname();
    const { open } = useSidebar();

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="overflow-hidden p-1">
                <div className="relative hidden md:flex justify-end items-center space-x-2">
                    <SidebarTrigger
                        className={`w-full max-w-10 h-10 z-10 hover:bg-sidebar-accent cursor-pointer ${
                            open && "text-sidebar-accent-foreground"
                        }`}
                        type="button"
                    />
                    <p
                        className={`absolute top-1/2 -translate-y-1/2 left-0 z-0 text-lg ml-2 font-semibold transition-transform ease-linear ${
                            !open && "opacity-0"
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
                    <SidebarSeparator />
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
                    ))}
                </SidebarGroupContent>
            </SidebarContent>
        </Sidebar>
    );
}
