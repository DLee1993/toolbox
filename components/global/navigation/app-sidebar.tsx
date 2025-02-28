"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";
import { sidebarRootItems, sidebarSubItems } from "./app-sidebar-item-list";
import { ChevronRight, Library, Dot, Type } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "../../ui/button";
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
            <SidebarHeader className="hidden md:block overflow-hidden p-0 md:px-1.5 md:my-1">
                <div className="flex gap-2 min-w-52 py-2 rounded">
                    <div className="grid place-content-center h-9 w-9 bg-foreground text-background rounded-md cursor-pointer">
                        <Type size={15} />
                    </div>
                    <p className="flex flex-col text-sm font-semibold">
                        Toolbox
                        <span className="text-xs text-muted-foreground font-normal">
                            A hub for essential tools.
                        </span>
                    </p>
                </div>
            </SidebarHeader>
            <SidebarContent
                className={`overflow-x-hidden px-1 py-1 mt-2 ${
                    open ? "overflow-y-auto" : "!overflow-y-auto hiddenScrollbar"
                }`}
            >
                <SidebarMenu className="gap-0">
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
                                className="min-h-10 min-w-10 hover:bg-muted"
                            >
                                <Link href={item.url} target={item.target ? "_blank" : "_self"}>
                                    {item.icon && <item.icon size={15} className="ml-1" />}
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
                                                className="min-h-10 min-w-10 hover:bg-muted"
                                            >
                                                {item.icon && (
                                                    <item.icon size={15} className="ml-1" />
                                                )}
                                                <p
                                                    className={`mx-2 min-w-28 overflow-hidden ease-linear text-sm ${
                                                        !open && !isMobile && "opacity-0"
                                                    }`}
                                                >
                                                    {item.title}
                                                </p>

                                                <div className="flex justify-center items-center ml-auto">
                                                    <SidebarMenuBadge className="relative right-0">
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
                                                className="px-2 min-h-10 min-w-10 hover:bg-muted"
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
