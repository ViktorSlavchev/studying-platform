import { useQuery } from "@tanstack/react-query";
import { fetchExamHistory } from "../../services/apiExams";
import { handleApiError } from "../../utils/handleApiError";
import { useNavigate } from "react-router";

export function useExamHistory() {
    const navigate = useNavigate();

    const { data: examsHistory, isLoading } = useQuery({
        queryKey: ["examHistory"],
        queryFn: fetchExamHistory,
        staleTime: 5 * 60 * 1000, // 5 minutes

        onError: (error) => {
            console.error("Failed to fetch exam history:", error);
            handleApiError(error, navigate, "/exams");
        }
    });

    return {
        examsHistory,
        isLoading
    };
}