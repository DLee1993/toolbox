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
            <PopoverContent className="w-screen max-w-lg bg-popover/90 backdrop-blur-sm space-y-5">
                <section>
                    {HelpProviderContentList.filter((item) => pathname === item.title).map(
                        (item, i) => (
                            <article key={i} className="flex-1 space-y-10">
                                <div className="space-y-2.5">
                                    <p className="text-sm w-11/12">{item.description}</p>
                                </div>
                                <ul className="list-disc list-inside space-y-1 text-sm">
                                    {item.points.map((p, i) => (
                                        <li key={i}>
                                            {p.text}{" "}
                                            <span className="text-xs font-bold">{p.subText}</span>
                                        </li>
                                    ))}
                                </ul>

                                <p className="text-sm font-semibold">{item.declaration}</p>
                            </article>
                        )
                    )}
                </section>
                <section className="flex justify-center items-center border-t border-border pt-4">
                    <h4>Is there a problem? <Link href="/settings#report" className="underline">Report it here</Link></h4>
                </section>
            </PopoverContent>
        </Popover>
    );
}
