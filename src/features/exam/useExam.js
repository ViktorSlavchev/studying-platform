import { useQuery } from "@tanstack/react-query";
import { fetchExamById } from "../../services/apiExams";

export function useExam({ id, onSuccess }) {
    const { data: exam, isLoading } = useQuery({
        queryKey: ["exam", id],
        queryFn: () => fetchExamById(id),
        select: (data) => JSON.parse(JSON.stringify(data)),
        enabled: !!id,
        staleTime: 60 * 60 * 1000, // 60 minutes
        onSuccess: (data) => {
            if (onSuccess) {
                onSuccess(data);
            }
        },
    });

    return {
        exam,
        isLoading,
    };
}