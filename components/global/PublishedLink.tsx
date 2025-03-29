import Link from "next/link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { IconType } from "react-icons/lib";
import { Button } from "@/components/ui/button";

export default function PublishedLink({
    Icon,
    label,
    href,
}: {
    Icon: IconType;
    label: string;
    href: string;
}) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="outline" className="rounded-lg size-10 p-0">
                        <Link
                            href={href}
                            className="w-full h-full grid place-content-center"
                            target="_blank"
                        >
                            <Icon />
                        </Link>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{label}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
