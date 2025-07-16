import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth.js";
import { handleApiError } from "../../utils/handleApiError.js";
import { useNavigate } from "react-router";

export function useUser() {
    const navigate = useNavigate();

    const { data: user, isLoading } = useQuery({
        queryKey: ["user"],
        queryFn: getCurrentUser,
        refetchOnWindowFocus: false,
        onError: (error) => {
            console.error("Failed to fetch user data:", error);
            handleApiError(error, navigate, "/login");
        }
    });

    return {
        user,
        isLoading
    };
}