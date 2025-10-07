"use client";

import { usePathname } from "next/navigation";
import { HelpProviderContentList } from "@/components/global/HelpProviderContentList";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { MessageCircleQuestionIcon } from "lucide-react";
import Link from "next/link";

export default function HelpProvider() {
    const pathname = usePathname();

    return (
        <Popover modal={true}>
            <PopoverTrigger asChild>
                <Button variant="outline">
                    Help <MessageCircleQuestionIcon />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="overflow-y-auto w-screen max-w-sm max-h-96 bg-accent/95 backdrop-blur-sm mr-2">
                {HelpProviderContentList.filter((item) => pathname === item.url).map((item, i) => (
                    <section key={i} className={item && "pb-10"}>
                        <article className="flex-1 space-y-5">
                            <h2 className="text-accent-foreground">What is it?</h2>
                            <div className="space-y-2.5">
                                <p className="text-sm w-11/12">{item.description}</p>
                                <ul className="list-disc list-inside space-y-1 text-sm">
                                    {item.points?.map((p, i) => (
                                        <li key={i}>
                                            {p.text} <span className="text-xs">{p.subText}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <h2 className="text-accent-foreground">How do I use it?</h2>
                            <div className="space-y-2.5">
                                <ul className="list-disc list-inside space-y-1 text-sm">
                                    {item.guide!.points.map((p, i) => (
                                        <li key={i}>
                                            {p.text} <span className="text-xs">{p.subText}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </article>
                    </section>
                ))}
                <section className="flex justify-center items-center text-sm">
                    <h4>
                        Is there a problem?{" "}
                        <Link href="/settings#report" className="underline text-accent-foreground">
                            Report it here
                        </Link>
                    </h4>
                </section>
            </PopoverContent>
        </Popover>
    );
}
