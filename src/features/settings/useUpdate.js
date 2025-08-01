import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

import { updateUser as updateUserApi } from "../../services/apiAuth";
import { handleApiError } from "../../utils/handleApiError";

export function useUpdate() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: updateUser, isLoading } = useMutation({
        mutationFn: (data) => updateUserApi(data),
        onSuccess: (user) => {
            queryClient.setQueryData(["user"], user);
            queryClient.invalidateQueries(["quotes"]);
            navigate("/settings", { replace: true });
            toast.success("Профилът е променен успешно.");
        },
        onError: (err) => {
            console.log("ERROR", err);
            toast.error("Грешка при актуализацията на данните.");
            handleApiError(err, navigate, "/settings", false);
        },
    });

    return { updateUser, isLoading };
}


