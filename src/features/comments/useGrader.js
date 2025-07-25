import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gradeComment } from "../../services/apiComments";
import { useNavigate } from "react-router";
import { handleApiError } from "../../utils/handleApiError";

export function useGrader() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();


    const { mutate: grade, isLoading } = useMutation({
        mutationFn: (x) => { console.log(x); return gradeComment(x); },
        onSuccess: () => {
            queryClient.invalidateQueries(["comments"]);
            navigate(0);
        },
        onError: (error) => {
            console.error("Failed to grade comment:", error);
            handleApiError(error, navigate, "/comment");
        }
    });


    return { grade, isLoading };
}
