import Image from "next/image";
import Link from "next/link";
import { DollarSign, Lock, ServerIcon, StarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import screenshot from "@/public/screenshot.webp";

const features = [
    {
        name: "Free for everyone.",
        description:
            "Our aim is to provide tools for free to users and small businesses. We can't do this without a sustainable revenue, so we decided to go with advertisments. These are shown on a seperate page as to not interfere with you or your productivity. Check them out, you may find something you like...",
        icon: DollarSign,
    },
    {
        name: "Security and Privacy.",
        description:
            "It's simple, we don't need nor do we want your personal data. We don't need to know who you are for you to use our services.",
        icon: Lock,
    },
    {
        name: "The tools.",
        description:
            "The platform offers a diverse range of tools, catering to different needs. If you have a tool you believe could be of use to everyone, get in touch with us.",
        icon: ServerIcon,
    },
];

export default function Home() {
    return (
        <section className="py-14">
            <div className="overflow-hidden">
                <div className="mx-auto w-11/12 max-w-7xl">
                    <div className="mx-auto grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                        <section>
                            <article className="w-11/12 max-w-xl mx-auto space-y-10 text-center lg:text-left">
                                <div>
                                    <p className="font-semibold text-indigo-600">
                                        Welcome to
                                    </p>
                                    <h1 className="text-4xl font-semibold tracking-tight text-pretty mt-6">
                                        Your digital Toolbox.
                                    </h1>
                                    <p className="mt-4">
                                        A platform offering free tools that empower people to
                                        navigate the digital world with ease, efficiency, and
                                        security.
                                    </p>
                                </div>
                                <div className="flex gap-4 w-fit mx-auto lg:mx-0">
                                    <Link href="https://github.com/DLee1993" target="_blank">
                                        <Button>
                                            <StarIcon /> star on github
                                        </Button>
                                    </Link>
                                    <Link href="https://github.com/DLee1993" target="_blank">
                                        <Button variant="link">Get in touch</Button>
                                    </Link>
                                </div>
                            </article>
                            <dl className="mt-20 max-w-xl mx-auto space-y-8 text-base/7 text-secondary-foreground lg:max-w-none">
                                {features.map((feature) => (
                                    <div key={feature.name} className="relative pl-9">
                                        <dt className="inline font-semibold text-card-foreground">
                                            <feature.icon
                                                aria-hidden="true"
                                                className="absolute top-1 left-1 size-5 text-indigo-600"
                                            />
                                            {feature.name}
                                        </dt>{" "}
                                        <dd className="inline">{feature.description}</dd>
                                    </div>
                                ))}
                            </dl>
                        </section>
                        <figure>
                            <Image
                                priority
                                alt="Product screenshot"
                                src={screenshot}
                                width={2000}
                                height={1000}
                                className="max-w-[50rem] mx-auto rounded-xl ring-1 shadow-xl ring-gray-400/10 sm:w-[57rem] scale-75"
                            />
                        </figure>
                    </div>
                </div>
            </div>
        </section>
    );
}
