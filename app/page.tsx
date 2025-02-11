import { Button } from "@/components/ui/button";
import Link from "next/link";
import { StarIcon } from "lucide-react";

export default function Home() {
    return (
        <section className="h-screen space-y-10 mx-auto text-center py-20">
            <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
                <article className="space-y-6">
                    <p className="mx-auto max-w-lg text-center text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                        Everything you need in one place.
                    </p>
                    <p>
                        Toolbox is a hub for essential tools that everbody needs.{" "}
                        <span className="underline">For Free</span>
                    </p>
                </article>
                <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
                    <div className="relative lg:row-span-2">
                        <div className="absolute inset-px rounded-lg lg:rounded-l-[2rem]"></div>
                        <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-l-[calc(2rem+1px)] bg-white/5">
                            <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                                <p className="mt-2 text-lg font-medium tracking-tight max-lg:text-center">
                                    A hub for everyone
                                </p>
                                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                                    The aim of this project is to bring as many tools that an
                                    individual needs together.
                                </p>
                            </div>
                            <div className="@container relative min-h-[30rem] w-full grow max-lg:mx-auto max-lg:max-w-sm">
                                <div className="absolute inset-x-10 top-10 bottom-0 overflow-hidden">
                                    image here
                                </div>
                            </div>
                        </div>
                        <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 lg:rounded-l-[2rem]"></div>
                    </div>
                    <div className="relative max-lg:row-start-1">
                        <div className="absolute inset-px rounded-lg max-lg:rounded-t-[2rem]"></div>
                        <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)] bg-white/5">
                            <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                                <p className="mt-2 text-lg font-medium tracking-tight max-lg:text-center">
                                    Free forever
                                </p>
                                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                                    As we advance technology, it has become increasingly difficult
                                    to stay safe online and know who to trust. With Toolbox, you can
                                    be assured that all tools provided are{" "}
                                    <span className="text-foreground">secure</span>,{" "}
                                    <span className="text-foreground">trustworthy</span> and{" "}
                                    <span className="text-foreground">free</span>
                                </p>
                            </div>
                            <div className="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
                                Image here
                            </div>
                        </div>
                    </div>
                    <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
                        <div className="absolute inset-px rounded-lg"></div>
                        <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] bg-white/5">
                            <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                                <p className="mt-2 text-lg font-medium tracking-tight max-lg:text-center">
                                    Security
                                </p>
                                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                                    Morbi viverra dui mi arcu sed. Tellus semper adipiscing
                                    suspendisse semper morbi.
                                </p>
                            </div>
                            <div className="@container flex flex-1 items-center max-lg:py-6 lg:pb-2">
                                image here
                            </div>
                        </div>
                    </div>
                    <div className="relative lg:row-span-2">
                        <div className="absolute inset-px rounded-lg max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
                        <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)] bg-white/5">
                            <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                                <p className="mt-2 text-lg font-medium tracking-tight max-lg:text-center">
                                    Help the cause
                                </p>
                                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                                    If your using the tools that toolbox provides for you, why not
                                    help keep it running with a small donation. With your help, we
                                    can start giving people better tools for free.
                                </p>
                            </div>
                            <div className="relative min-h-[30rem] w-full grow">
                                <div className="absolute top-10 right-0 bottom-0 left-10 overflow-hidden rounded-tl-xl">
                                    <div className="@container flex flex-1 items-center max-lg:py-6 lg:pb-2">
                                        image here
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
