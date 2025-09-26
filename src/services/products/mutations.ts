import { CreateReviewPayload, OrderPayload } from "@/types";
import { addComment, order } from "./api";
import { mutationOptions } from "@tanstack/react-query";

const addCommentMutation = (data: CreateReviewPayload) => {
    return mutationOptions({
        mutationFn: () => addComment(data),
    });
};

const orderMutation = (data: OrderPayload) => {
    return mutationOptions({
        mutationFn: () => order(data),
    });
};

export { addCommentMutation, orderMutation };