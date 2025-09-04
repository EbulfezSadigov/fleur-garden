import { subscribe } from "./api";
import { mutationOptions } from "@tanstack/react-query";
import { toast } from "sonner";

const subscribeMutation = (email: string) => {
    return mutationOptions({
        mutationFn: () => subscribe(email),
        onSuccess: () => {
            toast.success("Subscribed successfully");
        },
        onError: () => {
            toast.error("Failed to subscribe");
        },
    });
};

export { subscribeMutation };