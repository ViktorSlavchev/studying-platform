import { useQuery } from "@tanstack/react-query";
import { fetchQuotes } from "../../services/apiQuotes";
import { handleApiError } from "../../utils/handleApiError";
import { useNavigate } from "react-router";

export function useQuotes() {
    const navigate = useNavigate();

    const { data: quotes, isLoading } = useQuery({
        queryKey: ["quotes"],
        queryFn: fetchQuotes,
        staleTime: 3 * 60 * 1000,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,


        onError: (error) => {
            console.error("Failed to fetch quotes:", error);
            handleApiError(error, navigate, "/quotes");
        }
    });

    return {
        quotes,
        isLoading
    };
}