import { API_URL } from "../../config.js";

export async function fetchExamHistory() {
    try {
        const response = await fetch(`${API_URL}/exams/history`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error(`Error fetching exam history: ${response.statusText}`);
        }

        const data = await response.json();
        return data.data.exams || [];
    } catch (error) {
        console.error("Failed to fetch exam history:", error);
        throw error;
    }
}