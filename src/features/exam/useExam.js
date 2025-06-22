import { useQuery } from "@tanstack/react-query";
import { fetchExamById } from "../../services/apiExams";

export function useExam(id) {
    const { data: exam, isLoading } = useQuery({
        queryKey: ["exam", id],
        queryFn: () => fetchExamById(id),
        enabled: !!id,
    });


    return {
        exam,
        isLoading,
    };
}