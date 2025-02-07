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
                <li className="socialLink">
                    <Link href={href} target="_blank" className="socialLink-content">
                        <Icon size={18} />
                        <span className="sr-only">{label}</span>
                    </Link>
                </li>
            </TooltipTrigger>
            <TooltipContent>
                <p>{label}</p>
            </TooltipContent>
        </Tooltip>
    );
};
