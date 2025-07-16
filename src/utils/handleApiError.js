import toast from "react-hot-toast";

export function handleApiError(error, navigate, path = "/home", displayToast = true) {
    const message = error?.message || "Something went wrong";

    if (message.toLowerCase().includes("jwt expired")) {
        if (displayToast) toast.error("Сесията е изтекла. Моля, влезте отново.");
        navigate("/login");
    } else {
        if (displayToast) toast.error(`Something went wrong: ${message}`);
        navigate(path, { replace: true });
    }
}
