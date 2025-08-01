import { API_URL } from "../../config.js";

export async function fetchMistakenQuestions() {
    try {
        const res = await fetch(`${API_URL}/questions/mistaken-questions`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            throw new Error('Failed to fetch mistaken questions');
        }

        const data = await res.json();
        return data.data.mistakenQuestions || [];
    } catch (error) {
        console.error('Error fetching mistaken questions:', error);
        throw error;
    }
}