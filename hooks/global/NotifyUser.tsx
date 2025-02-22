import { toast } from "@/hooks/global/use-toast";

export const NotifyUser = (type: string, message: string) => {
    toast({ title: type, description: message, duration: 1350 });
};
