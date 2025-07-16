import { useQuery } from "@tanstack/react-query";
import { fetchExamById } from "../../services/apiExams";
import { handleApiError } from "../../utils/handleApiError";
import { useNavigate } from "react-router";

export function useExam({ id, onSuccess }) {
    const navigate = useNavigate();

    const { data: exam, isLoading } = useQuery({
        queryKey: ["exam", id],
        queryFn: () => fetchExamById(id),
        select: (data) => {
            return JSON.parse(JSON.stringify(data)); // Deep clone to avoid mutation issues
        },
        enabled: !!id,
        staleTime: 60 * 60 * 1000, // 60 minutes
        onSuccess: (data) => {
            if (onSuccess) {
                onSuccess(data);
            }
        },
        onError: (error) => {
            console.error("Failed to fetch exam data:", error);
            handleApiError(error, navigate, "/exams")
        },
    });

    return {
        exam,
        isLoading,
    };
}