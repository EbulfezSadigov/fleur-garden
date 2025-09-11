import { CreateReviewPayload } from "@/types";
import { addComment } from "./api";
import { mutationOptions } from "@tanstack/react-query";

const addCommentMutation = (data: CreateReviewPayload) => {
    return mutationOptions({
        mutationFn: () => addComment(data),
    });
};

export { addCommentMutation };