"use client";

import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { sidebarItems } from "@/components/global/navigation/app-sidebar-item-list";

export default function Home() {
    return (
        <section className="w-full py-16 space-y-28">
            <div className="mx-auto max-w-2xl space-y-8">
                <div className="flex justify-center">
                    <div className="relative rounded-full px-5 py-1 text-sm/6 text-muted-foreground ring-1 ring-ring/25">
                        Want to check out the code?{" "}
                        <Link
                            href="https://github.com/DLee1993/toolbox"
                            target="_blank"
                            className="font-semibold text-foreground"
                        >
                            Read more <span aria-hidden="true">&rarr;</span>
                        </Link>
                    </div>
                </div>
                <article className="text-center">
                    <h1 className="text-5xl font-semibold tracking-tight text-balance sm:text-7xl">
                        Your Ultimate Digital Companion
                    </h1>
                    <p className="mt-8 text-lg font-medium text-pretty text-muted-foreground">
                        A versatile platform designed to simplify and enhance your daily tasks,
                        bringing efficiency, and organization to your fingertips.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <button
                            onClick={() => {
                                window.scrollTo({ top: 500, behavior: "smooth" });
                            }}
                            className="group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-md bg-neutral-950 px-6 font-medium text-neutral-200 duration-500"
                        >
                            <div className="translate-y-0 opacity-100 transition group-hover:-translate-y-[150%] group-hover:opacity-0">
                                Get started
                            </div>
                            <div className="absolute translate-y-[150%] opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
                                <ArrowDown />
                            </div>
                        </button>
                        <Link
                            href="https://github.com/DLee1993/toolbox"
                            target="_blank"
                            className="font-semibold text-foreground"
                        >
                            Learn more <span aria-hidden="true">&rarr;</span>
                        </Link>
                    </div>
                </article>
            </div>
            <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-10">
                {sidebarItems.map((item) =>
                    item.items.map((subItem, i) => (
                        <div key={i} className="flex gap-4 p-6 sm:p-4">
                            <div className="size-7 p-2 bg-foreground rounded-sm grid place-content-center">
                                {<subItem.icon size={15} className="text-background" />}
                            </div>
                            <article className="min-h-20 flex flex-col justify-between items-start">
                                <h2 className="font-semibold">
                                    {subItem.title}.{" "}
                                    <span className="text-muted-foreground font-normal">
                                        {subItem.description}
                                    </span>
                                </h2>
                                <Link
                                    href={subItem.url}
                                    className="w-fit block relative after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-muted-foreground after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100 text-sm text-muted-foreground"
                                >
                                    Check it out &rarr;
                                </Link>
                            </article>
                        </div>
                    ))
                )}
            </section>
        </section>
    );
}
