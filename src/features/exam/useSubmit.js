import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { submitExam as submitExamApi } from "../../services/apiExams";
import toast from "react-hot-toast";

export function useSubmit() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: submit, isLoading } = useMutation({
        mutationFn: (examId) => submitExamApi(examId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["exam"] });
            navigate("/exams", { replace: true });
        },
        onError: (err) => {
            console.error("ERROR", err);
            toast.error("Грешка при предаване на изпита");
        },
    });

    return { submit, isLoading };
}