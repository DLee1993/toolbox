import Link from "next/link";
import { IconType } from "react-icons/lib";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export const PublishedLink = ({
    Icon,
    href,
    label,
}: {
    Icon: IconType;
    href: string;
    label: string;
}) => {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Link href={href} target="_blank" className="size-12 mx-auto border border-border rounded-[8px] hover:bg-muted grid place-content-center">
                    <li className="h-full flex space-x-3 items-center">
                        <Icon size={18} />
                        <span className="sr-only">{label}</span>
                    </li>
                </Link>
            </TooltipTrigger>
            <TooltipContent side="bottom">
                <p>{label}</p>
            </TooltipContent>
        </Tooltip>
    );
};
