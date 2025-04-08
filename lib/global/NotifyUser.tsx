import { toast } from "@/lib/global/use-toast";

export const NotifyUser = ({ type, message }: { type: string; message: string }) => {
    toast({ title: type, description: message, duration: 1350 });
};
