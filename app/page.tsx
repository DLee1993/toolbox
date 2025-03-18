"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import screenshot from "@/public/images/screenshot.webp";
import { StarIcon } from "lucide-react";

export default function Home() {
    return (
        <section className="py-10">
            <article className="flex flex-col justify-center items-center w-11/12 max-w-xl mx-auto space-y-10">
                <div className="text-center">
                    <sup className="text-primary text-sm">Welcome to</sup>
                    <h1 className="text-4xl font-semibold">Your digital Toolbox.</h1>
                </div>
                <p className="mt-4 text-pretty max-w-lg text-center">
                    A platform offering free tools that empower people to navigate the digital world
                    with ease, efficiency, and security.
                </p>

                <div className="flex gap-4 w-fit lg:mx-0">
                    <Link href="https://github.com/DLee1993/toolbox" target="_blank">
                        <Button className="border border-muted hover:text-foreground">
                            <StarIcon /> star on github
                        </Button>
                    </Link>
                </div>
            </article>
            <figure className="my-20">
                <Image
                    priority
                    alt="Product screenshot"
                    src={screenshot}
                    width={1000}
                    height={1000}
                    className="mx-auto w-11/12 max-w-3xl rounded-xl ring-1 shadow-xl ring-gray-400/10"
                />
            </figure>
        </section>
    );
}
