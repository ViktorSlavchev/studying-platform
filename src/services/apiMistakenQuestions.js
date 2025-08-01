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

export async function fetchReadingText(id) {
    try {
        const res = await fetch(`${API_URL}/questions/reading/${id}?readingOnly=true`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            throw new Error('Failed to fetch reading text');
        }

        const data = await res.json();
        return data.data.reading.text || '';
    } catch (error) {
        console.error('Error fetching reading text:', error);
        throw error;
    }
}

export async function deleteMistakenQuestion(id) {
    try {
        const res = await fetch(`${API_URL}/questions/mistaken-questions/${id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            throw new Error('Failed to delete mistaken question');
        }

    } catch (error) {
        console.error('Error deleting mistaken question:', error);
        throw error;
    }
}