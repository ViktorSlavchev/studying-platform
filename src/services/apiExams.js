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

export async function fetchExamById(id) {
    try {
        const response = await fetch(`${API_URL}/exams/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error(`Error fetching exam with ID ${id}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data.data)
        return data.data.exam || null;
    } catch (error) {
        console.error(`Failed to fetch exam with ID ${id}:`, error);
        throw error;
    }
}

export async function generateExam() {
    try {
        const response = await fetch(`${API_URL}/exams/generate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error(`Error generating exam: ${response.statusText}`);
        }

        const data = await response.json();
        return data.data.exam || null;
    } catch (error) {
        console.error("Failed to generate exam:", error);
        throw error;
    }
}

export async function submitExam(examId) {
    try {
        const response = await fetch(`${API_URL}/exams/submit`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error(`Error submitting exam with ID ${examId}: ${response.statusText}`);
        }

        const data = await response.json();
        return data.data.exam || null;
    } catch (error) {
        console.error(`Failed to submit exam with ID ${examId}:`, error);
        throw error;
    }
}