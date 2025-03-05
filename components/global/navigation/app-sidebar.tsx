"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";
import { ChevronRight, Library, Dot } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import {
    sidebarRootItems,
    sidebarSubItems,
} from "@/components/global/navigation/app-sidebar-item-list";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarSeparator,
    SidebarMenuBadge,
    useSidebar,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export function AppSidebar() {
    const pathname = usePathname();
    const { open, setOpen, isMobile } = useSidebar();

    const closeSidebar = () => setOpen(false);

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="overflow-hidden px-3 md:my-2">
                <div className="relative hidden md:block">
                    <SidebarTrigger
                        className="absolute top-1/2 -translate-y-1/2 -right-1.5 min-w-9 min-h-9 z-10 cursor-pointer"
                        type="button"
                        variant="secondary"
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
            {/* SIDEBAR CONTENT */}
            <SidebarContent
                className={`overflow-x-hidden px-[5px] py-1 ${
                    open ? "overflow-y-auto" : "!overflow-y-auto hiddenScrollbar"
                }`}
            >
                {/* SIDEBAR MENU */}
                <SidebarMenu className="gap-2">
                    {sidebarRootItems.map((item, i) => (
                        <SidebarMenuItem
                            key={`RootItem-${i}`}
                            className={item.title === "Advertisements" ? "md:hidden" : ""}
                        >
                            <SidebarMenuButton
                                asChild
                                tooltip={item.title}
                                isActive={pathname === "/" ? true : false}
                                onClick={closeSidebar}
                                className="min-h-9 min-w-9 hover:bg-muted"
                            >
                                <Link href={item.url} target={item.target ? "_blank" : "_self"}>
                                    {item.icon && <item.icon size={15} className="ml-0.5" />}
                                    <p
                                        className={`mx-2 min-w-52 transition-opacity duration-200 ease-linear ${
                                            !open && !isMobile && "opacity-0"
                                        }`}
                                    >
                                        {item.title}
                                    </p>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>

                <SidebarSeparator className="bg-border" />

                {/* SIDEBAR MENU */}
                <SidebarGroup className="!px-0">
                    <SidebarGroupLabel className="sr-only">Menu</SidebarGroupLabel>
                    <SidebarMenu className="items-start">
                        {sidebarSubItems.map((item) =>
                            open || isMobile ? (
                                //------------------------------------------------------------------------- COLLAPSIBLE MENU SHOWS WHEN SIDEBAR IS OPEN OR WHEN MOBILE MENU IS OPEN
                                <Collapsible key={item.title} asChild className="group/collapsible">
                                    <SidebarMenuItem className="w-full">
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton
                                                tooltip={item.title}
                                                className="min-h-9 min-w-9 hover:bg-muted"
                                            >
                                                {item.icon && (
                                                    <item.icon size={15} className="ml-0.5" />
                                                )}
                                                <p
                                                    className={`mx-2 min-w-28 overflow-hidden ease-linear text-sm ${
                                                        !open && !isMobile && "opacity-0"
                                                    }`}
                                                >
                                                    {item.title}
                                                </p>

                                                <div className="flex justify-center items-center ml-auto">
                                                    <SidebarMenuBadge className="relative right-2">
                                                        {item.items.length}
                                                    </SidebarMenuBadge>
                                                    <ChevronRight
                                                        size={16}
                                                        className="transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                                                    />
                                                </div>
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                                            <SidebarMenuSub>
                                                {item.items.map((subItem) => (
                                                    <SidebarMenuSubItem key={subItem.title}>
                                                        <SidebarMenuSubButton
                                                            asChild
                                                            className={`cursor-pointer hover:bg-muted min-h-10 ${
                                                                pathname === subItem.url
                                                                    ? "text-foreground"
                                                                    : "text-foreground/50 hover:text-foreground"
                                                            }`}
                                                            onClick={closeSidebar}
                                                        >
                                                            <Link href={subItem.url}>
                                                                <>
                                                                    {"icon" in subItem ? (
                                                                        <subItem.icon size={15} />
                                                                    ) : (
                                                                        <Library />
                                                                    )}
                                                                    <p>{subItem.title}</p>
                                                                    {pathname === subItem.url && (
                                                                        <Dot className="ml-auto" />
                                                                    )}
                                                                </>
                                                            </Link>
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                ))}
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </SidebarMenuItem>
                                </Collapsible>
                            ) : (
                                //------------------------------------------------------------------------- DROPDOWN MENU SHOWS WHEN SIDEBAR IS CLOSED
                                <DropdownMenu key={item.title}>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <DropdownMenuTrigger
                                                asChild
                                                className="px-2 min-h-9 min-w-9 hover:bg-muted"
                                            >
                                                <Button variant="ghost">{<item.icon />}</Button>
                                            </DropdownMenuTrigger>
                                        </TooltipTrigger>
                                        <TooltipContent side="right">{item.title}</TooltipContent>
                                    </Tooltip>

                                    <DropdownMenuContent
                                        side="right"
                                        sideOffset={25}
                                        align="start"
                                        className="max-h-60 min-w-48 overflow-y-auto"
                                    >
                                        <DropdownMenuLabel className="max-w-[190px] truncate">
                                            {item.title}
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        {item.items.map((subItem) => (
                                            <DropdownMenuItem
                                                asChild
                                                key={subItem.title}
                                                className={`cursor-pointer hover:bg-muted min-h-10 ${
                                                    pathname === subItem.url
                                                        ? "text-foreground"
                                                        : "text-foreground/50 hover:text-foreground"
                                                }`}
                                                onClick={closeSidebar}
                                            >
                                                <Link href={subItem.url}>
                                                    <>
                                                        {"icon" in subItem ? (
                                                            <subItem.icon
                                                                className="ml-1"
                                                                size={15}
                                                            />
                                                        ) : (
                                                            <Library className="ml-1" />
                                                        )}
                                                        <p>{subItem.title}</p>
                                                        {pathname === subItem.url && (
                                                            <Dot className="ml-auto" />
                                                        )}
                                                    </>
                                                </Link>
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )
                        )}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
