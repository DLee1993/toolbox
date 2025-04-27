import { toast } from "@/lib/global/use-toast";

export const NotifyUser = ({
    type,
    message,
    duration = 1350,
}: {
    type: string;
    message: string;
    duration?: number;
}) => {
    toast({ title: type, description: message, duration: duration });
};
