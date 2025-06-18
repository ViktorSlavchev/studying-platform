import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

import { changePassword as changePasswordApi } from "../../services/apiAuth";

export function useChangePassword() {
    const navigate = useNavigate();

    const { mutate: changePassword, isLoading } = useMutation({
        mutationFn: ({ currentPassword, newPassword }) =>
            changePasswordApi({ currentPassword, newPassword }),
        onSuccess: () => {
            navigate("/settings", { replace: true });
            toast.success("Паролата е променена успешно.");
        },
        onError: (err) => {
            console.log("ERROR", err);
            if (err.response && err.response.status === 401) {
                toast.error("Грешна стара парола.");
                return;
            }

            toast.error("Грешка при промяна на паролата.");
        },
    });


    return { changePassword, isLoading };
} 