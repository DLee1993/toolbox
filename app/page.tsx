"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "motion/react";
import { Button } from "@/components/ui/button";
import screenshot from "@/public/screenshot.webp";
import { DollarSignIcon, LockIcon, ServerIcon, StarIcon } from "lucide-react";

const features = [
    {
        name: "Free for everyone.",
        description:
            "Our aim is to provide tools for free to users and small businesses. We can't do this without a sustainable revenue, so we decided to go with advertisments. These are shown on a seperate page as to not interfere with you or your productivity. Check them out, you may find something you like...",
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
        <section className="customYPadding">
            <div className="overflow-hidden">
                <div className="mx-auto w-11/12 max-w-7xl">
                    <div className="mx-auto grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                        <section>
                            <article className="w-11/12 max-w-xl mx-auto space-y-10 text-center lg:text-left">
                                <div>
                                    <p className="font-semibold text-primary">Welcome to</p>
                                    <h1 className="text-4xl font-semibold tracking-tight text-pretty mt-2">
                                        Your digital Toolbox.
                                    </h1>
                                    <motion.p
                                        variants={textAnimation}
                                        initial="hidden"
                                        animate="show"
                                        className="mt-4 text-pretty"
                                    >
                                        A platform offering free tools that empower people to
                                        navigate the digital world with ease, efficiency, and
                                        security.
                                    </motion.p>
                                </div>
                                <motion.div
                                    variants={textAnimation}
                                    initial="hidden"
                                    animate="show"
                                    className="flex gap-4 w-fit mx-auto lg:mx-0"
                                >
                                    <Link href="https://github.com/DLee1993" target="_blank">
                                        <Button>
                                            <StarIcon /> star on github
                                        </Button>
                                    </Link>
                                    <Link href="https://github.com/DLee1993" target="_blank">
                                        <Button variant="link">Get in touch</Button>
                                    </Link>
                                </motion.div>
                            </article>
                            <dl className="mt-20 max-w-xl mx-auto space-y-8 leading-7 text-secondary-foreground lg:max-w-none">
                                {features.map((feature) => (
                                    <motion.div
                                        variants={textAnimation}
                                        initial="hidden"
                                        whileInView="show"
                                        viewport={{ amount: 0.2, once: true }}
                                        key={feature.name}
                                        className="relative pl-9"
                                    >
                                        <dt className="inline font-semibold text-card-foreground">
                                            <feature.icon
                                                aria-hidden="true"
                                                className="absolute top-1 left-1 size-5 text-primary"
                                            />
                                            {feature.name}
                                        </dt>{" "}
                                        <dd className="inline">{feature.description}</dd>
                                    </motion.div>
                                ))}
                            </dl>
                        </section>
                        <motion.figure variants={imageAnimation} initial="hidden" animate="show">
                            <Image
                                priority
                                alt="Product screenshot"
                                src={screenshot}
                                width={2000}
                                height={1000}
                                className="max-w-[50rem] mx-auto rounded-xl ring-1 shadow-xl ring-gray-400/10 sm:w-[57rem] scale-90"
                            />
                        </motion.figure>
                    </div>
                </div>
            </div>
        </section>
    );
}
