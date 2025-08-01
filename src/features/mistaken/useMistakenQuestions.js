import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchMistakenQuestions, deleteMistakenQuestion } from "../../services/apiMistakenQuestions";

export function useMistakenQuestions() {
    const { data: mistakenQuestions, isLoading } = useQuery({
        queryKey: ["mistakenQuestions"],
        queryFn: fetchMistakenQuestions,
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });

    return {
        mistakenQuestions,
        isLoading,
    };
}

export function useDeleteMistakenQuestion() {
    const queryClient = useQueryClient();

    const { mutate: deleteMistaken, isLoading: isDeleting } = useMutation({
        mutationFn: deleteMistakenQuestion,
        onSuccess: () => {
            // Invalidate and refetch mistaken questions
            queryClient.invalidateQueries(["mistakenQuestions"]);
        },
        onError: (error) => {
            console.error('Error deleting mistaken question:', error);
        },
    });

    return {
        deleteMistaken,
        isDeleting,
    };
}