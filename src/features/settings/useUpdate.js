import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

import { updateUser as updateUserApi } from "../../services/apiAuth";

export function useUpdate() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: updateUser, isLoading } = useMutation({
        mutationFn: ({ email, name }) => updateUserApi({ email, name }),
        onSuccess: (user) => {
            queryClient.setQueryData(["user"], user);
            navigate("/settings", { replace: true });
            toast.success("Името и имейла са променени успешно.");
        },
        onError: (err) => {
            console.log("ERROR", err);
            toast.error("Грешка при актуализацията на данните.");
        },
    });

    return { updateUser, isLoading };
} 