import { useQuery } from "@tanstack/react-query";
import { fetchComments } from "../../services/apiComments";
import { handleApiError } from "../../utils/handleApiError";
import { useNavigate } from "react-router";

export function useComments() {
    const navigate = useNavigate();

    const { data: comments, isLoading } = useQuery({
        queryKey: ["comments"],
        queryFn: fetchComments,
        staleTime: 30 * 60 * 1000, // 30 minutes

        onError: (error) => {
            console.error("Failed to fetch comments:", error);
            handleApiError(error, navigate, "/comments");
        }
    });

    return {
        comments,
        isLoading
    };
}