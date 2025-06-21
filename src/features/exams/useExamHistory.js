import { useQuery } from "@tanstack/react-query";
import { fetchExamHistory } from "../../services/apiExams";

export function useExamHistory() {
    const { data: examsHistory, isLoading } = useQuery({
        queryKey: ["examHistory"],
        queryFn: fetchExamHistory,
    });

    return {
        examsHistory,
        isLoading
    };
}