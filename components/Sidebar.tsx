"use client";

import { Home, Key } from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
    SidebarTrigger,
    useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const items = [
    {
        title: "Password generator",
        url: "/password-generator",
        icon: Key,
    },
];

export function AppSidebar() {
    const pathname = usePathname();
    const { open } = useSidebar();

    useEffect(() => console.log(open), [open]);

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="overflow-hidden">
                <div className="relative hidden md:flex justify-end items-center space-x-2">
                    <SidebarTrigger className="w-full max-w-8 z-10" />
                    <p
                        className={`absolute top-1/2 -translate-y-1/2 left-0 z-0 text-lg font-semibold transition-all ease-linear ${
                            open ? "opacity-100 delay-100" : "opacity-0 translate-y-1"
                        }`}
                    >
                        MonoLayer
                    </p>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                asChild
                                tooltip="Home"
                                className={`space-x-2 text-base transition-colors ${
                                    pathname === "/" ? "bg-neutral-200" : ""
                                }`}
                            >
                                <Link href="/">
                                    <Home size={16} />
                                    <p className="min-w-52">Home</p>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
                <SidebarSeparator />
                <SidebarGroup className="mt-0">
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        tooltip={item.title}
                                        className={`space-x-2 text-base transition-colors ${
                                            pathname === item.url ? "bg-neutral-200" : ""
                                        }`}
                                    >
                                        <a href={item.url}>
                                            <item.icon size={16} />
                                            <p className="min-w-52">{item.title}</p>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
