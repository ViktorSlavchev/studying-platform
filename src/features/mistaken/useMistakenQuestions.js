import { useQuery } from "@tanstack/react-query";
import { fetchMistakenQuestions } from "../../services/apiMistakenQuestions";

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