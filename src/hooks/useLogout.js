import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

import { logout as logoutApi } from "../services/apiAuth";
import { toast } from "react-hot-toast";

export function useLogout() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: logout, isLoading } = useMutation({
        mutationFn: () => logoutApi(),
        onSuccess: () => {
            queryClient.removeQueries({ queryKey: ['user'] });
            navigate('/login', { replace: true });
        },
        onError: (err) => {
            console.error('Logout error:', err);
            toast.error('Logout failed');
        },
    });

    return { logout, isLoading };
}