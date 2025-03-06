"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "motion/react";
import { Button } from "@/components/ui/button";
import screenshot from "@/public/screenshot.webp";
import { DollarSignIcon, LockIcon, ServerIcon, StarIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
    {
        name: "Free for everyone.",
        description:
            "Our aim is to provide tools for free. We can't do this without a sustainable revenue, so we rely on donations and adverts to keep the lights on.",
        icon: DollarSignIcon,
    },
    {
        name: "Security and Privacy.",
        description:
            "It's simple, we don't need nor do we want your personal data. We don't need to know who you are for you to use our services.",
        icon: LockIcon,
    },
    {
        name: "The tools.",
        description:
            "The platform offers a diverse range of tools, catering to different needs. If you have a tool you believe could be of use to everyone, get in touch with us.",
        icon: ServerIcon,
    },
];

const imageAnimation: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 1, ease: "anticipate" } },
};

const textAnimation: Variants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "anticipate" } },
};

export default function Home() {
    return (
        <section className="py-10">
            <article className="flex flex-col justify-center items-center w-11/12 max-w-xl mx-auto space-y-10">
                <div className="text-center">
                    <p className="text-primary">Welcome to</p>
                    <h1 className="text-xl leading-none mt-2">Your digital Toolbox.</h1>
                </div>
                <motion.p
                    variants={textAnimation}
                    initial="hidden"
                    animate="show"
                    className="mt-4 text-pretty max-w-lg text-center"
                >
                    A platform offering free tools that empower people to navigate the digital world
                    with ease, efficiency, and security.
                </motion.p>

                <motion.div
                    variants={textAnimation}
                    initial="hidden"
                    animate="show"
                    className="flex gap-4 w-fit lg:mx-0"
                >
                    <Link href="https://github.com/DLee1993" target="_blank">
                        <Button className="border border-muted hover:text-foreground">
                            <StarIcon /> star on github
                        </Button>
                    </Link>
                    <Link href="https://github.com/DLee1993" target="_blank">
                        <Button variant="link">Get in touch</Button>
                    </Link>
                </motion.div>
            </article>
            <motion.figure
                variants={imageAnimation}
                initial="hidden"
                animate="show"
                className="my-20"
            >
                <Image
                    priority
                    alt="Product screenshot"
                    src={screenshot}
                    width={1000}
                    height={1000}
                    className="mx-auto w-11/12 max-w-3xl rounded-xl ring-1 shadow-xl ring-gray-400/10"
                />
            </motion.figure>
            <section className="grid gap-4 grid-cols-[repeat(auto-fit,_minmax(min(300px,_100%),_1fr))]">
                {features.map((feature) => (
                    <motion.div
                        variants={textAnimation}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ amount: 0.2, once: true }}
                        key={feature.name}
                    >
                        <Card className="min-h-[285px] max-w-md mx-auto flex flex-col justify-center gap-5 bg-card text-card-foreground">
                            <CardHeader className="text-center">
                                <CardTitle>
                                    {
                                        <feature.icon
                                            size={16}
                                            className="text-card-foreground mx-auto"
                                        />
                                    }
                                </CardTitle>
                                <CardDescription className="text-base text-card-foreground">
                                    {feature.name}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="text-pretty text-center">{feature.description}</CardContent>
                        </Card>
                    </motion.div>
                ))}
            </section>
        </section>
    );
}
