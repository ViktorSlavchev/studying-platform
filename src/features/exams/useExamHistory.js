import { useQuery } from "@tanstack/react-query";
import { fetchExamHistory } from "../../services/apiExams";

export function useExamHistory() {
    const { data: examsHistory, isLoading } = useQuery({
        queryKey: ["examHistory"],
        queryFn: fetchExamHistory,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });

    return {
        examsHistory,
        isLoading
    };
}