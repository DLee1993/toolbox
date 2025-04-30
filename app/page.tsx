"use client";

import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { sidebarItems } from "@/components/global/navigation/app-sidebar-item-list";
import Footer from "@/components/global/Footer";
import ToolLink from "@/components/root/ToolLink";

export default function Home() {
    const parentElementLength = 10; // Desired number of items in the parent
    const currentArray = sidebarItems || []; // Use the provided array, or default to an empty array

    // Calculate the required number of placeholders dynamically
    const missingElements = Math.max(0, parentElementLength - currentArray.length);

    // Create a new array that fills the gaps
    const extendedArray = [...currentArray, ...Array(missingElements).fill(null)];

    return (
        <section>
            <section className="w-full py-16 space-y-28">
                <div className="mx-auto max-w-2xl space-y-8">
                    <div className="flex justify-center">
                        <div className="relative rounded-full px-5 py-1 text-sm/6 text-muted-foreground ring-1 ring-ring/25">
                            Want to check out the code?{" "}
                            <Link
                                href="https://github.com/DLee1993/toolbox"
                                target="_blank"
                                className="font-semibold text-foreground ml-2"
                            >
                                Read more <span aria-hidden="true">&rarr;</span>
                            </Link>
                        </div>
                    </div>
                    <article className="text-center">
                        <h1 className="text-5xl font-semibold tracking-tight text-balance sm:text-6xl">
                            Your Ultimate Digital Companion
                        </h1>
                        <p className="mt-8 text-md font-medium text-pretty text-muted-foreground">
                            A versatile platform designed to simplify and enhance your daily tasks,
                            bringing efficiency, and organization to your fingertips.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <button
                                onClick={() => {
                                    window.scrollTo({ top: 500, behavior: "smooth" });
                                }}
                                className="group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-md  px-6 font-medium duration-500 transition-transform bg-foreground text-background"
                            >
                                <div className="translate-y-0 opacity-100 transition group-hover:-translate-y-[150%] group-hover:opacity-0">
                                    Get started
                                </div>
                                <div className="absolute translate-y-[150%] opacity-0 transition-transform group-hover:translate-y-0 group-hover:opacity-100">
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
                <section className="flex flex-wrap justify-center max-w-6xl">
                    {extendedArray.map((item) =>
                        item?.items.map((subItem: { [key: string]: string }, i: number) => (
                            <ToolLink tool={subItem} index={i} key={i} />
                        ))
                    )}
                </section>
            </section>
            <Footer />
        </section>
    );
}
