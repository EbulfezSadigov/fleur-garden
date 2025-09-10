import { Review } from "@/types";
import { addComment } from "./api";
import { mutationOptions } from "@tanstack/react-query";

const addCommentMutation = (data: Review) => {
    return mutationOptions({
        mutationFn: () => addComment(data),
    });
};

export { addCommentMutation };