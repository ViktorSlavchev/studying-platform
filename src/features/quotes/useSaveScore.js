import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { saveScore as saveScoreApi } from "../../services/apiQuotes";
import { handleApiError } from "../../utils/handleApiError";
import toast from "react-hot-toast";

export function useSaveScore() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: saveScore, isLoading } = useMutation({
        mutationFn: ({ score, correct }) => {
            if (!score) score = 0;
            saveScoreApi({ score, correct });
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
        },

        onError: (err) => {
            console.error("Error saving score:", err);
            toast.error("Грешка при запазване на резултата. ");
            handleApiError(err, navigate, "/quotes", false);
        }
    });

    return { saveScore, isLoading };
}