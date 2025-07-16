import { API_URL } from "../../config.js";
import { handleApiError } from "../utils/handleApiError.js";

export async function fetchExamHistory() {
    try {
        const response = await fetch(`${API_URL}/exams/history`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });

        const body = await response.json();

        if (!response.ok) {
            throw new Error(body.message || `Error fetching exam history (${response.status})`);
        }

        return body.data.exams || [];
    } catch (error) {
        console.error("Failed to fetch exam history:", error.message);
        throw error;
    }
}

export async function fetchExamById(id) {
    try {
        const response = await fetch(`${API_URL}/exams/${id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });

        const body = await response.json();


        if (!response.ok) {
            throw new Error(body.message || `Error fetching exam with ID ${id} (${response.status})`);
        }

        return body.data.exam || null;
    } catch (error) {
        console.error(`Failed to fetch exam with ID ${id}:`, error.message);
        handleApiError(error);
        throw error;
    }
}

export async function generateExam() {
    try {
        const response = await fetch(`${API_URL}/exams/generate`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({})
        });

        const body = await response.json();

        if (!response.ok) {
            throw new Error(body.message || `Error generating exam (${response.status})`);
        }


        return body.data || null;
    } catch (err) {
        console.error("Failed to generate exam:", err.message);
        throw err;
    }
}

export async function submitExam(examId, answers) {
    try {
        const response = await fetch(`${API_URL}/exams/submit`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ examId, answers }),
        });

        const body = await response.json();

        if (!response.ok) {
            throw new Error(body.message || `Error submitting exam with ID ${examId} (${response.status})`);
        }

        console.log(body.data)

        return body.data.exam || null;
    } catch (error) {
        console.error(`Failed to submit exam with ID ${examId}:`, error.message);
        throw error;
    }
}
