import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { submitExam as submitExamApi } from "../../services/apiExams";
import toast from "react-hot-toast";
import { handleApiError } from "../../utils/handleApiError";

export function useSubmit() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: submit, isLoading } = useMutation({
        mutationFn: ({ id: examId, answers }) => {
            submitExamApi(examId, answers)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["exam"] });
            navigate(0); // reload current page to show updated exam status
            toast.success("Изпитът е предаден успешно");
        },
        onError: (err) => {
            console.error("ERROR", err);
            toast.error("Грешка при предаване на изпита. Опитайте отново.");
            handleApiError(err, navigate, "/exams", false);
        },
    });

    return { submit, isLoading };
}