"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { StarIcon } from "lucide-react";
import { sidebarItems } from "@/components/global/navigation/app-sidebar-item-list";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function Home() {
    return (
        <section className="py-10">
            <section className="flex flex-col justify-center items-center mx-auto space-y-10 py-10">
                <article className="space-y-5">
                    <div className="text-center">
                        <sup className="text-muted-foreground text-sm">Welcome to</sup>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold">Your digital Toolbox.</h1>
                    </div>
                    <p className="text-pretty text-center text-muted-foreground">
                        A platform offering free web tools to simplify your daily tasks.
                    </p>
                </article>
                <div className="flex gap-4 w-fit lg:mx-0">
                    <Link href="https://github.com/DLee1993/toolbox" target="_blank">
                        <Button className="border border-muted hover:text-foreground">
                            <StarIcon /> star on github
                        </Button>
                    </Link>
                </div>
            </section>

            <section className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
                {sidebarItems.map((item) =>
                    item.items.map((subItem, i) => (
                        <Card key={i} className="w-full flex flex-col justify-between items-center">
                            <CardHeader className="text-center space-y-2">
                                <CardTitle className="text-xl">{subItem.title}</CardTitle>
                                <CardDescription>{subItem.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="sr-only">
                                    link to {subItem.title} web tool provided by the platform
                                </p>
                            </CardContent>
                            <CardFooter className="w-full flex justify-between">
                                <Button className="w-full p-0">
                                    <Link href={subItem.url} className="block size-full px-4 py-2">
                                        Open Tool
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))
                )}
            </section>
        </section>
    );
}
