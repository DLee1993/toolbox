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
                <Link href={href} target="_blank" className="socialLink-content">
                    <li className="socialLink">
                        <Icon size={18} />
                        <span className="sr-only">{label}</span>
                    </li>
                </Link>
            </TooltipTrigger>
            <TooltipContent>
                <p>{label}</p>
            </TooltipContent>
        </Tooltip>
    );
};
