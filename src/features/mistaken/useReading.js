import { useQuery } from "@tanstack/react-query";
import { fetchReadingText } from "../../services/apiMistakenQuestions";

export function useReading(id) {
    const { data: reading, isLoading, error } = useQuery({
        queryKey: ["reading", id],
        queryFn: () => fetchReadingText(id),
        enabled: !!id, // Only run query if id is provided
        staleTime: Infinity, // Never refetch - readings never change
        cacheTime: Infinity, // Keep in cache forever
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });


    return {
        reading,
        isLoading,
        error,
    };
}
